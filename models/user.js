const mongoose = require('mongoose');
const { DEFAULTSETTINGS: defaults } = require('../config');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    userID: String,
    username: String,
    experience: {
        "type": Number,
        "default": defaults.experience,
    },
    level: {
        "type": Number,
        "default": defaults.level,
    }
});

module.exports = mongoose.model("User", userSchema);