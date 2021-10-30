const mongoose = require('mongoose');
const { Guild, Modules, User } = require('../models');

module.exports = (client) => {
    client.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        const createModules = await new Modules(merged);
        createGuild.save().then(g => console.log(`Serveur ajouté ==> ${g.guildName}`));
        createModules.save();
    }

    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        return client.config.DEFAULTSETTINGS;
    }

    client.getGuildFromId = async guildId => {
        const data = await Guild.findOne({ guildID: guildId });
        if (data) return data;
        return client.config.DEFAULTSETTINGS;
    }

    client.guildExist = async guildId => {
        const data = await Guild.findOne({ guildID: guildId });
        if (data) return true;
        return false;
    }

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }

    client.createUser = async user => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
        const createUser = await new User(merged);
        createUser.save().then(u => console.log(`Utilisateur ajouté ==> ${u.username}`));
    }

    client.getUser = async user => {
        const data = await User.findOne({ userID: user.id });
        if (data) return data;
        else return;
    }

    client.updateUser = async (user, settings) => {
        let data = await client.getUser(user);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }

    client.getModules = async guild => {
        const data = await Modules.findOne({ guildID: guild.id });
        if (data) return data;
        return;
    }

    client.getModulesFromId = async guildId => {
        const data = await Modules.findOne({ guildID: guildId });
        if (data) return data;
        else return;
    }

    client.updateModules = async (guild, settings) => {
        let data = await client.getModules(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }

    client.updateModulesFromId = async (guildId, settings) => {
        let data = await client.getModulesFromId(guildId);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }

    client.addExp = async (client, member, expToAdd) => {
        const userToUpdate = await client.getUser(member);
        const updatedExp = userToUpdate.experience + expToAdd;
        await client.updateUser(member, { experience: updatedExp });
    }

    client.removeExp = async (client, member, expToRemove) => {
        const userToUpdate = await client.getUser(member);
        const updatedExp = userToUpdate.experience - expToRemove;
        const updatedLevel = Math.floor(0.1 * Math.sqrt(updatedExp));
        await client.updateUser(member, { experience: updatedExp, level: updatedLevel });
    }
}