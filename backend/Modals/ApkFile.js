const mongoose = require("mongoose");

const apkFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  filesize: {
    type: String,
    required: true
  },
  versionCode: {
    type: String,
    required: true
  },
  versionName: {
    type: String,
    required: true
  },
  isActive: {
    type: String,
    default: "1"
  }
}, { timestamps: true });

module.exports = mongoose.model("ApkFile", apkFileSchema);
