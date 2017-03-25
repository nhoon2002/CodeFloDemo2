var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({


   teamname: {
        type: String,
        trim: true,
        required: "Team Name is Required"
    },
   description: {
      type: String
   },
   tech: {
      type: String
   },
    teamMembers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]


});

var Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
