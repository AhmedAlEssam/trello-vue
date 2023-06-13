const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  dueDate: Date,
  assignee: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;