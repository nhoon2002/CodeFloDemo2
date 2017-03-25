var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  todo: {
    type: String
  },
  teamTodos: [{
    type: Schema.Types.ObjectId,
    ref: "Team"
  }]
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
