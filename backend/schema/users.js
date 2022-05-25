const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')
const userSchema = new Schema({

   googleId: String,


});
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);