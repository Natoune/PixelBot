const { MESSAGES } = require('../../utils/constants');

module.exports.run = async (client, message, args, settings) => {
    const user = message.mentions.members.first();
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

    if (!user) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`**Utilisateur Invalide !**\nUtilisation: \`${settings.prefix}${MESSAGES.COMMANDS.MODERATION.KICK.usage}\`\n${MESSAGES.COMMANDS.MODERATION.KICK.usage_details}`)
            .setColor("#e74c3c")
        ]
    });

    if (user.permissions.has('ADMINISTRATOR')) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Vous ne pouvez pas bannir un Administrateur !`)
            .setColor("#e74c3c")
        ]
    });

    user.roles.remove(muteRole.id)
    .catch(console.err);
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNMUTE;