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
        required: true,
    },
    content: {
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Task', taskSchema);