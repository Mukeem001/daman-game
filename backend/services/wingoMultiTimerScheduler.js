const Historywingo1min = require("../Modals/Historywingo1min.js");
const Historywingo30sec = require("../Modals/Historywingo30sec.js");
const Historywingo3min = require("../Modals/Historywingo3min.js");
const Historywingo5min = require("../Modals/Historywingo5min.js");
const Betcontrol = require("../Modals/Betcontrol.js");
const Wingo30secBetControl = require("../Modals/Wingo30secbetcontrol.js");
const Wingo3minBetControl = require("../Modals/Wingo3minbetcontrol.js");
const Wingo5minBetControl = require("../Modals/Wingo5minbetcontrol.js");

const TIMER_CONFIGS = [
  {
    key: "30sec",
    roundSeconds: 30,
    historyModel: Historywingo30sec,
    betControlModel: Wingo30secBetControl,
  },
  {
    key: "1min",
    roundSeconds: 60,
    historyModel: Historywingo1min,
    betControlModel: Betcontrol,
  },
  {
    key: "3min",
    roundSeconds: 180,
    historyModel: Historywingo3min,
    betControlModel: Wingo3minBetControl,
  },
  {
    key: "5min",
    roundSeconds: 300,
    historyModel: Historywingo5min,
    betControlModel: Wingo5minBetControl,
  },
];

const pad2 = (n) => String(n).padStart(2, "0");

const getRoundStartUnix = (roundSeconds) => {
  const now = Math.floor(Date.now() / 1000);
  return now - (now % roundSeconds);
};

const buildPeriodNo = (roundStartUnix, roundSeconds) => {
  const d = new Date(roundStartUnix * 1000);
  const base = `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}${pad2(d.getHours())}${pad2(d.getMinutes())}`;

  // 30s rounds need extra suffix so same-minute two rounds remain unique.
  if (roundSeconds === 30) {
    return `${base}${pad2(d.getSeconds())}`;
  }
  return base;
};

const pickResultNumber = (betDoc) => {
  const numberValues = [
    betDoc?.Num0 || 0,
    betDoc?.Num1 || 0,
    betDoc?.Num2 || 0,
    betDoc?.Num3 || 0,
    betDoc?.Num4 || 0,
    betDoc?.Num5 || 0,
    betDoc?.Num6 || 0,
    betDoc?.Num7 || 0,
    betDoc?.Num8 || 0,
    betDoc?.Num9 || 0,
  ];

  const allZero = numberValues.every((v) => v === 0);
  if (allZero) {
    return Math.floor(Math.random() * 10);
  }

  const minValue = Math.min(...numberValues);
  const minCandidates = numberValues
    .map((v, idx) => ({ v, idx }))
    .filter((x) => x.v === minValue)
    .map((x) => x.idx);

  return minCandidates[Math.floor(Math.random() * minCandidates.length)];
};

const deriveResultMeta = (num) => {
  const bigsmall = num >= 5 ? "Big" : "Small";
  let color = "defaultColor";

  if (num === 0) color = "mixedColor0";
  else if (num === 5) color = "mixedColor5";
  else if (num % 2 === 1) color = "greenColor";

  return { bigsmall, color };
};

const ensureRoundSeedData = async (cfg) => {
  const roundStartUnix = getRoundStartUnix(cfg.roundSeconds);
  const periodno = buildPeriodNo(roundStartUnix, cfg.roundSeconds);

  const [historyExists, betExists] = await Promise.all([
    cfg.historyModel.findOne({ periodno }),
    cfg.betControlModel.findOne({ priodno: periodno }),
  ]);

  if (!historyExists) {
    await cfg.historyModel.create({
      periodno,
      betnumbers: "",
      bigsmall: "",
      color: "",
    });
  }

  if (!betExists) {
    await cfg.betControlModel.create({ priodno: periodno });
  }
};

const resolveRoundIfNeeded = async (cfg) => {
  const now = Math.floor(Date.now() / 1000);
  const remaining = cfg.roundSeconds - (now % cfg.roundSeconds);
  if (remaining !== 2) return;

  const roundStartUnix = getRoundStartUnix(cfg.roundSeconds);
  const periodno = buildPeriodNo(roundStartUnix, cfg.roundSeconds);

  const historyItem = await cfg.historyModel.findOne({ periodno });
  if (!historyItem || historyItem.betnumbers) return;

  const betDoc = await cfg.betControlModel.findOne({ priodno: periodno });
  const resultNumber = pickResultNumber(betDoc);
  const { bigsmall, color } = deriveResultMeta(resultNumber);

  await cfg.historyModel.findOneAndUpdate(
    { periodno },
    {
      $set: {
        betnumbers: String(resultNumber),
        bigsmall,
        color,
      },
    },
    { new: true }
  );
};

const startWingoMultiTimerSchedulers = () => {
  for (const cfg of TIMER_CONFIGS) {
    setInterval(async () => {
      try {
        await ensureRoundSeedData(cfg);
        await resolveRoundIfNeeded(cfg);
      } catch (err) {
        console.error(`[${cfg.key}] scheduler error:`, err.message);
      }
    }, 1000);
  }

  console.log("🟢 [WINGO MULTI-TIMER] 30sec/3min/5min schedulers started");
};

module.exports = { startWingoMultiTimerSchedulers };
