const Discord = require('discord.js')

module.exports = {
    run: (message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !")
        
        const number = args.slice(0).join(' ')
        if(!number || isNaN(number) || number < 1 || number > 99) return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Utilisation de la commande invalide, essayez de l'utiliser comme ça:\n`?clear [nombre]`\n\nArguments:\n`nombre`: *nombre de messages à supprimer (nombre entier entre 1 et 99)*")
        .setColor('#ff4848'))

        message.channel.bulkDelete(number + 1)
        if (number > 1) {
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(number + " messages ont été supprimés !")
            .setColor('#333333'))
        } else {
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(number + " message a été supprimé !")
            .setColor('#333333'))
        }
    }, 
    name: 'clear',
    guildOnly: true
}