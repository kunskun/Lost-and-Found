const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PoseSchema = new Schema({
  id: String,
  image: String,
  name: String,
  status: String,
  tag: String,
  foundPlace: String,
  returnPlace: String,
  description: String,
});

module.exports = mongoose.model("Pose", PoseSchema);
