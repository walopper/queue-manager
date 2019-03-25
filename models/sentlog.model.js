const mongoose = require('mongoose');

var sentLogSchema = new mongoose.Schema({
    ip: { type: String },
    domain: { type: String },
    time: { type: Number },
    bytes: { type: Number }
});

module.exports = mongoose.model('sent_log', sentLogSchema);