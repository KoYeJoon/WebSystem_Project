const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    userIdNum : {
        type: Number,
        required : true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    treatInfo: {
        type: String,
    },
});


recordSchema.plugin(mongooseAutoInc.plugin,'record');
module.exports = mongoose.model('record',recordSchema);



