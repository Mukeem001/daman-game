const express = require("express");
require("dotenv").config();
const mongooseCon = require("./_db");
var cors = require("cors");
const axios = require("axios");
const requestLogger = require("./middleware/logger");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const historywingoitem = require("./Modals/Historywingo1min.js");
const betcontrol = require("./Modals/Betcontrol.js");
const { startWingoMultiTimerSchedulers } = require("./services/wingoMultiTimerScheduler");

const app = express();
let schedulersStarted = false;

// CORS configuration for custom headers
app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "auto-token", "auth-token", "admin-token", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(requestLogger); // Add request logging

const port = process.env.PORT || 5000;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "✅ Backend is running!", port: port, time: new Date() });
});

// Auth routes (no auth middleware needed)
app.use("/api/auth", require("./Router/auth.js"));

app.use("/api/Bet", require("./Router/notes.js"));
app.use("/api/user", require("./Router/user.js"));
app.use("/api/Address", require("./Router/address.js"));
app.use("/api/pay", require("./Router/payment.js"));
app.use("/api/withdraw", require("./Router/payment.js"));
app.use("/api/history", require("./Router/historywingo1min.js"));
app.use("/api/history30sec", require("./Router/historywingo30sec.js"));
app.use("/api/history3min", require("./Router/historywingo3min.js"));
app.use("/api/history5min", require("./Router/historywingo5min.js"));

app.use("/api/betcontrol", require("./Router/betcontrol.js"));
app.use("/api/wingo30secbetcontrol", require("./Router/wingo30secbetcontrol.js"));
app.use("/api/wingo3minbetcontrol", require("./Router/wingo3minbetcontrol.js"));
app.use("/api/wingo5minbetcontrol", require("./Router/wingo5minbetcontrol.js"));

app.use("/api/userbethistory", require("./Router/userbethistory.js"));
app.use("/api/bet/history", require("./Router/bethistory.js"));

// const adminAuth = require("./middleware/adminAuth.js");
// app.use("/api/admin", adminAuth, require("./Router/admin.js"));
app.use("/api/admin", require("./Router/admin.js")); // ⚠️ TEMPORARY: Token removed for testing
app.use("/api/admin/settings", require("./Router/settings.js")); // Settings API
app.use("/api/promotion", require("./Router/promotion.js"));
app.use("/api/notices", require("./Router/notices.js"));


// Utility function to get current time-related variables
const getCurrentTimeVars = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");

  return { year, month, day, hours, minutes, seconds };
};

const callAddWingoItems = async () => {
  try {
    const { year, month, day, hours, minutes } = getCurrentTimeVars();

    const periodno = `${year}${month}${day}${hours}${minutes}`;
    const betnumbers = "";
    const bigsmall = "";
    const color = "";

    const notes = new historywingoitem({
      periodno,
      betnumbers,
      bigsmall,
      color,
    });

    const data = await notes.save();
    console.log("Automatic call to addwingoitems successful:", data);
  } catch (error) {
    console.error("Error in automatic call to addwingoitems:", error);
  }
};

const callAddTotalBetWingoItems = async () => {
  try {
    const { year, month, day, hours, minutes, seconds } = getCurrentTimeVars();

    console.log(seconds, "this is mukeem");
    console.log("this is mukeem and hairis");

    const priodno = `${year}${month}${day}${hours}${minutes}`;
    const big = 0;
    const small = 0;
    const red = 0;
    const green = 0;
    const violet = 0;
    const Num1 = 0;
    const Num2 = 0;
    const Num3 = 0;
    const Num4 = 0;
    const Num5 = 0;
    const Num6 = 0;
    const Num7 = 0;
    const Num8 = 0;
    const Num9 = 0;
    const Num0 = 0;

    const notes = new betcontrol({
      priodno,
      big,
      small,
      red,
      green,
      violet,
      Num1,
      Num2,
      Num3,
      Num4,
      Num5,
      Num6,
      Num7,
      Num8,
      Num9,
      Num0,
    });

    const data = await notes.save();
    console.log("Automatic call to addwingoitems successful:", data);
  } catch (error) {
    console.error("Error in automatic call to addwingoitems:", error);
  }
};

// const scheduleNextCall = () => {
//   const now = new Date();
//   const seconds = now.getSeconds();
//   const millisecondsUntilNextMinute = (60 - seconds) * 1000;

//   setTimeout(() => {
//     callAddWingoItems();
//     callAddTotalBetWingoItems();
//     scheduleNextCall();
//   }, millisecondsUntilNextMinute);
// };

// scheduleNextCall();

// NOTE: 1min seed data is now handled by wingoMultiTimerScheduler.js
// setInterval(() => {
//   try {
//     const { seconds } = getCurrentTimeVars();
//     if (seconds === 0) {
//       Promise.allSettled([callAddWingoItems(), callAddTotalBetWingoItems()]);
//     }
//   } catch (e) {
//     console.error('Add items scheduler error:', e.message);
//   }
// }, 5000);

const callUpdateWingoItems = async () => {
  try {
    const { year, month, day, hours, minutes } = getCurrentTimeVars();
    const priodno = `${year}${month}${day}${hours}${minutes}`;
    const periodno = `${year}${month}${day}${hours}${minutes}`;

    const updateData = {
      betnumbers: 0,  // Default values
      bigsmall: "",
      color: ""
    
    };

    const getdata = await betcontrol.findOne({ priodno });

    // ✅ ADD NULL CHECK - if no data found, skip update
    if (!getdata) {
      console.log("⚠️ No betcontrol data found for priodno:", priodno, "- Skipping update");
      return;
    }

    let Num0resultg = getdata.Num0;
    let Num1resultg = getdata.Num1;
    let Num2resultg = getdata.Num2;
    let Num3resultg = getdata.Num3;
    let Num4resultg = getdata.Num4;

     let Num5resultg = getdata.Num5;
     let Num6resultg = getdata.Num6;
     let Num7resultg = getdata.Num7;
     let Num8resultg = getdata.Num8;
     let Num9resultg = getdata.Num9;







    const getsmallnumber = () => {
      const redvariables = {
          Num0resultg,
          Num1resultg,
          Num2resultg,
          Num3resultg,
          Num4resultg,
      };
  
      console.log(redvariables);
      const redvariableNames = Object.keys(redvariables);
      const redvalues = Object.values(redvariables);
  
      // Check if all values are the same
      const allValuesSame = redvalues.every(val => val === redvalues[0]);
  
      if (allValuesSame) {
          // Apply random condition
          const randomNumber = Math.floor(Math.random() * 5); // Generates a random number between 5 and 9
          // setResultNumber(randomNumber);
          // setResultcolor("blue"); // Set a color or any other condition for random case
          console.log("All values are the same. Applying random  small apluafdfnkladf condition:", randomNumber);
  
          switch (randomNumber) {
            case 1:
                // console.log("this is Num0resultg");
                updateData.betnumbers = 1;
                updateData.color = "greenColor";
                break;
            case 2:
                console.log("this is Num1resultg");
                updateData.betnumbers = 2;
                updateData.color = "defaultColor";
                
                break;
            case 3:
                console.log("this is Num2resultg");
                updateData.betnumbers = 3;
                updateData.color = "greenColor";
               
                break;
            case 4:
                console.log("this is Num3resultg");
                updateData.betnumbers = 4;
                updateData.color = "defaultColor";
                
                break;
            case 0:
                console.log("this is Num4resultg");
                updateData.betnumbers = 0;
                updateData.color = "mixedColor0";
             
                break;
            default:
                let randomNumber = Math.floor(Math.random() * 4);
                updateData.betnumbers =  randomNumber;
                
                
                console.log("Default case applied with this is for small aplly random number:", randomNumber);
        }
      } else {
          // Proceed with finding the smallest value and original logic
          const redsmallestValue = Math.min(...redvalues);
          const redsmallestVariableName =
              redvariableNames[redvalues.indexOf(redsmallestValue)];
  
          console.log(redsmallestVariableName, "this is khusbu");
  
          switch (redsmallestVariableName) {
              case "Num0resultg":
                  console.log("this is Num0resultg");
                  updateData.betnumbers = 0;
                  updateData.color = "mixedColor0";
                  break;
              case "Num1resultg":
                  console.log("this is Num1resultg");
                  updateData.betnumbers = 1;
                  updateData.color = "greenColor";
                  
                  break;
              case "Num2resultg":
                  console.log("this is Num2resultg");
                  updateData.betnumbers = 2;
                  updateData.color = "defaultColor";
                  
                  break;
              case "Num3resultg":
                  console.log("this is Num3resultg");
                  updateData.betnumbers = 3;
                  updateData.color = "greenColor";
                  
                  break;
              case "Num4resultg":
                  console.log("this is Num4resultg");
                  updateData.betnumbers = 4;
                  updateData.color = "defaultColor";
                 
                  break;
              default:
                  let randomNumber = Math.floor(Math.random() * 6);
                  updateData.betnumbers = randomNumber;
                  updateData.color = "defaultColor";
                  
                  console.log("Default case applied with random number:", randomNumber);
          }
      }
  };



  const getbignumber = () => {
    const redvariables = {
        Num5resultg,
        Num6resultg,
        Num7resultg,
        Num8resultg,
        Num9resultg,
    };
  
    console.log(redvariables);
    const redvariableNames = Object.keys(redvariables);
    const redvalues = Object.values(redvariables);
  
    // Check if all values are the same
    const allValuesSame = redvalues.every(val => val === redvalues[0]);
  
    if (allValuesSame) {
        // Apply random condition
        const randomNumber = Math.floor(Math.random() * 5) + 5; // Generates a random number between 5 and 9
        // setResultNumber(randomNumber);
        // setResultcolor("blue"); // Set a color or any other condition for random case
        console.log("All values are the same. Applying random condition:", randomNumber);
  
        switch (randomNumber) {
          case 5:
              console.log("this is Num5resultg");

              updateData.betnumbers = 5;
              updateData.color = "mixedColor5";
              
              break;
          case 6:
              console.log("this is Num6resultg");
              updateData.betnumbers = 6;
              updateData.color = "defaultColor";
              
              break;
          case 7:
              console.log("this is Num7resultg");
              updateData.betnumbers = 7;
              updateData.color = "greenColor";
              
              break;
          case 8:
              console.log("this is Num8resultg");
              updateData.betnumbers = 8;
              updateData.color = "defaultColor";
              
              break;
          case 9:
              console.log("this is Num9resultg");
              updateData.betnumbers = 9;
              updateData.color = "greenColor";
             
              break;
          default:
              let randomNumber = Math.floor(Math.random() * 5) + 5;
              console.log(randomNumber);
              updateData.betnumbers = randomNumber;
              // updateData.color = "mixedColor5";
              
      }
    } else {
        // Proceed with finding the smallest value and original logic
        const redsmallestValue = Math.min(...redvalues);
        const redsmallestVariableName =
            redvariableNames[redvalues.indexOf(redsmallestValue)];
  
        console.log(redsmallestVariableName, "this is khusbu");
  
        switch (redsmallestVariableName) {
            case "Num5resultg":
                console.log("this is Num5resultg");
                updateData.betnumbers = 5;
              updateData.color = "mixedColor5";
                
                break;
            case "Num6resultg":
                console.log("this is Num6resultg");
                updateData.betnumbers = 6;
              updateData.color = "defaultColor";
                
                break;
            case "Num7resultg":
                console.log("this is Num7resultg");
                updateData.betnumbers = 7;
              updateData.color = "greenColor";
                
                break;
            case "Num8resultg":
                console.log("this is Num8resultg");
                updateData.betnumbers = 8;
              updateData.color = "defaultColor";
                
                break;
            case "Num9resultg":
                console.log("this is Num9resultg");
                updateData.betnumbers = 9;
              updateData.color = "greenColor";
                
                break;
            default:
                let randomNumber = Math.floor(Math.random() * 5) + 5;
                console.log(randomNumber);
                updateData.betnumbers = randomNumber;
              
                
        }
    }
  };


    if (getdata) {
      
  
        // Determine if the result is "Big" or "Small"
        if (getdata.big < getdata.small) {
          updateData.bigsmall = "Big";
          
          getbignumber();
          
          console.log("this is big result");
        } else if (getdata.big > getdata.small) {
          updateData.bigsmall = "Small";
         
          getsmallnumber();
          console.log("this is small result");
        } else {
          let randomNumber = Math.random();
  
          // Set result based on random number
          if (randomNumber < 0.5) {
            updateData.bigsmall = "Small";
            
            getsmallnumber();
            console.log("this is random small");
          } else {
            updateData.bigsmall = "Big";
           
            getbignumber();
  
            console.log("this is random big");
          }
        }
  

    } else {
      console.log("No data found for priodno:", priodno);
    }


   

    // Find and update the document
    const updatedData = await historywingoitem.findOneAndUpdate(
      { periodno },
      { $set: updateData },
      { new: true }  // Return the updated document
    );

    if (updatedData) {
      console.log("Document updated:", updatedData);
    } else {
      console.log("No document found for priodno:", periodno);
    }

    // console.log("Automatic call to updatewingoitems successful:", updatedData);
  } catch (error) {
    console.error("Error in automatic call to updatewingoitems:", error);
  }
};

// Set interval to call the function every second
// Disabled buffering update scheduler
// setInterval(() => { ... }, 1000);

// ============ SCHEDULER: Auto-update pending bets every second ============
const startAutoUpdateScheduler = () => {
  let lastSchedulerRun = 0;
  const schedulerInterval = setInterval(async () => {
    try {
      const now = Date.now();
      
      // Run every 5 seconds to avoid overwhelming the system
      if (now - lastSchedulerRun < 5000) {
        return;
      }
      
      lastSchedulerRun = now;
      
      console.log(`⏰ [SCHEDULER] Running master auto-update at ${new Date().toISOString()}`);
      
      // Call the master auto-update endpoint
      const response = await axios.post(
        `http://localhost:${port}/api/userbethistory/masterautoUpdate`,
        {},
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 
        }
      );
      
      if (response.data && response.data.results) {
        const { totalUpdated, wins, losses } = response.data.results;
        if (totalUpdated > 0) {
          console.log(`✅ [SCHEDULER] Updated ${totalUpdated} bets (${wins} wins, ${losses} losses)`);
        } else {
          console.log(`ℹ️  [SCHEDULER] No pending bets to update`);
        }
      }
    } catch (error) {
      console.error(`❌ [SCHEDULER] Error:`, error.message);
    }
  }, 1000);
  
  console.log("🟢 [SCHEDULER] Auto-update scheduler started - will run every 5 seconds");
};

// 404 handler - routes not found

app.use(notFoundHandler);

// Global error handler - must be last middleware
app.use(errorHandler);

// ============ MIDNIGHT COMMISSION JOB ============
// Commission rates per tier (% of bet volume)
const TIER_RATES = { 1: 0.006, 2: 0.004, 3: 0.003, 4: 0.002, 5: 0.001 };

const calculateAndPayCommissions = async () => {
  console.log("💰 Running midnight commission calculation...");
  try {
    const User = require("./Modals/User.js");
    const Userbethistory = require("./Modals/Userbethistory.js");
    const CommissionHistory = require("./Modals/CommissionHistory.js");

    // Get yesterday's time range (Unix seconds)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yStart = Math.floor(yesterday.getTime() / 1000);
    const yEnd = yStart + 86400;

    // Get all bets from yesterday grouped by userId
    const volumeByUser = await Userbethistory.aggregate([
      { $match: { ordertime: { $gte: yStart, $lt: yEnd } } },
      { $group: { _id: "$userId", volume: { $sum: "$pamount" } } }
    ]);

    if (volumeByUser.length === 0) {
      console.log("💰 No bets yesterday. Skipping commission.");
      return;
    }

    // For each user who bet, trace up to 5 referral levels
    for (const { _id: bettorId, volume } of volumeByUser) {
      let currentCode = null;
      try {
        const bettor = await User.findById(bettorId).select("referredBy");
        if (!bettor || !bettor.referredBy) continue;
        currentCode = bettor.referredBy;
      } catch { continue; }

      for (let tier = 1; tier <= 5; tier++) {
        if (!currentCode) break;
        const referrer = await User.findOne({ invitationCode: currentCode }).select("_id referredBy totalCommission userbalance");
        if (!referrer) break;

        const commission = parseFloat((volume * TIER_RATES[tier]).toFixed(2));
        if (commission > 0) {
          await User.findByIdAndUpdate(referrer._id, {
            $inc: { userbalance: commission, totalCommission: commission }
          });
          await CommissionHistory.create({
            userId: referrer._id,
            fromUserId: bettorId,
            amount: commission,
            tier,
            betVolume: volume,
            description: `Tier ${tier} commission from bet volume ₹${volume}`,
          });
        }
        currentCode = referrer.referredBy;
      }
    }
    console.log(`💰 Commission paid for ${volumeByUser.length} active bettors.`);
  } catch (err) {
    console.error("💰 Commission job error:", err.message);
  }
};

// Schedule: run at midnight every night
const scheduleMidnightCommission = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0); // next midnight
  const msToMidnight = midnight.getTime() - now.getTime();
  console.log(`💰 Commission job scheduled in ${Math.round(msToMidnight / 60000)} minutes.`);
  setTimeout(async () => {
    await calculateAndPayCommissions();
    // After first run, repeat every 24 hours
    setInterval(calculateAndPayCommissions, 24 * 60 * 60 * 1000);
  }, msToMidnight);
};

// ============ INITIALIZE SERVER WITH MONGODB CONNECTION ============
const initializeServer = async () => {
  try {
    // Connect to MongoDB
    await mongooseCon();
    
    // Start the Express server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    
    // Start schedulers AFTER MongoDB is connected
    scheduleMidnightCommission();
    startAutoUpdateScheduler();
    startWingoMultiTimerSchedulers();
    schedulersStarted = true;
    
  } catch (error) {
    console.error("❌ Failed to initialize server:", error);
    process.exit(1);
  }
};

// Start the server
initializeServer();
