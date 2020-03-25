const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;
const taskSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Task', taskSchema);