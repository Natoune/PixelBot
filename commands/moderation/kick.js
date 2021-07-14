const Discord = require('discord.js')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Utilisation de la commande invalide, essayez de l'utiliser comme ça:\n`?kick [utilisateur] (raison optionnel)`\n\nArguments:\n`utilisateur`: *Mention de l'utilisateur (@Pseudo)*\n`reason`: *Texte (peut inclure des espaces)*")
        .setColor('#ff4848')) 
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("**Vous ne pouvez pas kick le Propriétaire du serveur !**")
        .setColor('#ff4848'))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Vous ne pouvez pas kick un modérateur !")
        .setColor('#ff4848'))
        if (!member.kickable) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Vous ne pouvez pas kick ce membre !")
        .setColor('#ff4848'))
        const reason = args.slice(1).join(' ') || 'Aucune raison donnée'

        member.send("Vous avez été kick de **" + message.guild.name + "**, raison:\n```" + reason + "```")

        await member.kick(reason)
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**${member.user.tag} a été exclu !**`)
        .setDescription("**Raison:** " + reason)
        .setColor("#353535"))
    },
    name: 'kick',
    guildOnly: true
}