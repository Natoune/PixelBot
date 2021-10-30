const mongoose = require('mongoose');

const modulesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    experience: {
        "type": Boolean,
        "default": true,
    },
    moderation: {
        "type": Boolean,
        "default": true,
    },
    misc: {
        "type": Boolean,
        "default": true,
    },
    music: {
        "type": Boolean,
        "default": true,
    }
});

module.exports = mongoose.model("Modules", modulesSchema);