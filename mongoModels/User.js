var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "First Name is Required"
  },
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  skills: {
    type: String,
    trim : true
  },
  avatar: {
    type: String
  },
  SQLid: {
    type: Number
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  lastUpdated: { 
    type: Date
  },
  userAdmin: {
    default: false
  },
  team: [{
    type: Schema.Types.ObjectId,
    ref: "Team"
  }]
});

var User = mongoose.model("User", UserSchema);

// Export the model so the server can use it
module.exports = User;
