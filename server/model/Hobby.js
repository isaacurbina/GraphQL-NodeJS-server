const mongoose = require("mongoose");
const MSchema = mongoose.Schema;

const hobbySchema = new MSchema({
  title: String,
  description: String,
  userID: Number,
});

module.exports = mongoose.model("Hobby", hobbySchema);
