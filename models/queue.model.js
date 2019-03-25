const mongoose = require('mongoose');

var queueSchema = new mongoose.Schema({
    messageId: { type: String },
    ip: { type: String },
    domain: { type: String },
    active: { type: Boolean }
});

module.exports = mongoose.model('queue', queueSchema);