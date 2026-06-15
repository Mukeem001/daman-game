const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoticeSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  recipientType: { type: String, enum: ["broadcast", "userId", "userName"], default: "broadcast" },
  userId: { type: String, default: null },
  userName: { type: String, default: null },
}, {
  timestamps: true
});

module.exports = mongoose.model("Notice", NoticeSchema);

