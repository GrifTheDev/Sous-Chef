const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const suggestionSchema = mongoose.Schema({
  _id: reqString,
  userId: reqString,
  avatarURL: reqString,
  messageId: reqString,
  reason: reqString,
  suggestion: {
    title: reqString,
    desc: reqString,
    id: reqString,
    status: reqString,
  },
  timestamp: reqString,
});

module.exports = mongoose.model("suggestions", suggestionSchema);
