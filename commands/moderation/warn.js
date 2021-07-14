const Discord = require('discord.js')
const db = require('../../db.json')
const functions = require('../../functions')

module.exports = {
    run: (message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !")
        
        const member = message.mentions.members.first()

        if (!member) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Utilisation de la commande invalide, essayez de l'utiliser comme ça:\n`?warn [utilisateur]`\n\nArguments:\n`utilisateur`: *Mention de l'utilisateur (@Pseudo)*")
        .setColor('#ff4848'))

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Vous ne pouvez pas warn un modérateur !")
        .setColor('#ff4848'))

        const reason = args.slice(1).join(' ') || 'Aucune raison donnée'
        const maxWarn = 3

        if (db['warn'][member.id] == (maxWarn - 1)) {
            delete db['warn'][member.id]
            member.send("Vous avez été banni de **" + message.guild.name + "**, raison:\n```" + reason + "```")
            member.ban({reason})
        } else if (!db['warn'][member.id]) {
            db['warn'][member.id] = 1
            functions.saveDb()
            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`**${member.user.tag} a été warn !**`)
                .setDescription("**Raison:** " + reason)
                .setColor("#353535"))
        } else {
            db['warn'][member.id]++
            functions.saveDb()
            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`**${member.user.tag} a été warn !**`)
                .setDescription("**Raison:** " + reason)
                .setColor("#353535"))
        }
    },
    name: 'warn',
    guildOnly: true
}