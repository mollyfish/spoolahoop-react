var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
  token: String
});

//user stats
// userSchema.methods.userCategoryStats = function(category) {
// 	if(err) return err;
// 	this.category = category;
// 	var correct = this.correct;
// 	var total = this.total;
// 	var average = correct/total;
// 	return average;
// };

userSchema.methods.generateHash = function(pw, cb) {
  bcrypt.hash(pw, 8, function(err, hash) {
    if (err) return cb(err);
    this.password = hash;
    cb(null, hash);
  }.bind(this));
};

userSchema.methods.compareHash = function(pw, cb) {
  bcrypt.compare(pw, this.password, cb);
};

userSchema.methods.generateToken = function(cb) {
  eat.encode({ id: this._id }, process.env.APP_SECRET, cb);
};

module.exports = mongoose.model('User', userSchema);
