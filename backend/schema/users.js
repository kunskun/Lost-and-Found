const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')
const userSchema = new Schema({

   googleId: String,
   displayName: String,
   users: Number,


});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);