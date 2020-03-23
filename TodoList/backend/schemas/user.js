const mongoose = require('mongoose');
const moment = require('moment');
moment.tz.setDefault("Asia/Seoul");

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: moment().format('YYYY-MM-DD'),
    },
});

module.exports = mongoose.model('User', userSchema);