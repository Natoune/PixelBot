const Discord = require('discord.js')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !")
        
        const member = message.mentions.members.first()

        if (!member) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Utilisation de la commande invalide, essayez de l'utiliser comme ça:\n`?ban [utilisateur] (raison optionnel)`\n\nArguments:\n`utilisateur`: *Mention de l'utilisateur (@Pseudo)*\n`reason`: *Texte (peut inclure des espaces)*")
        .setColor('#ff4848')) 

        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("**Vous ne pouvez pas bannir le Propriétaire du serveur !**")
        .setColor('#ff4848'))

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Vous ne pouvez pas bannir un modérateur !")
        .setColor('#ff4848'))

        if (!member.bannable) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Vous ne pouvez pas bannir ce membre !")
        .setColor('#ff4848'))

        const reason = args.slice(1).join(' ') || 'Aucune raison donnée'
        member.send("Vous avez été banni de **" + message.guild.name + "**, raison:\n```" + reason + "```")
        
        await member.ban({reason})
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**${member.user.tag} a été banni !**`)
        .setDescription("**Raison:** " + reason)
        .setColor("#333333"))
    },
    name: 'ban',
    guildOnly: true
}