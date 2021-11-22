const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task must have name'],
        trim: true,
        maxLength: [50, 'Task name is no more than 50 character']
    },
    complete:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task',TaskSchema);