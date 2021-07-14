const Discord = require('discord.js')
const db = require('../../db.json')
const functions = require('../../functions')
const Levels = require('discord.js-leveling')

module.exports = {
    run: (message, args) => {
        const member = message.mentions.users.first() || message.author
        const avatar = member.avatarURL();
        if (member.bot) return message.channel.send("<@" + member + "> est un **bot** ! Les bots ne font **pas** partie du classement.")
        if (!db['levels']['xp'][member.id]) return message.channel.send("", {files: ["https://natoune.tk/levels-card.png?levels=1&points=1&maxpoints=" + Levels.xpFor(1) / 10 + "&name=" + member.username + "&avatar=" + member.avatarURL()]})
    
        const level = db['levels']['level'][member.id]
        const xp = db['levels']['xp'][member.id]
        message.channel.send("", {files: [`https://natoune.tk/levels-card.png?levels=${level}&points=${xp}&maxpoints=` + Levels.xpFor(level) / 10 + "&name=" + member.username + "&avatar=" + member.avatarURL()]})
    },
    name: 'rank',
    guildOnly: true
}