const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args, settings) => {
    const user = message.mentions.members.first();
    const reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée.');

    if (user) {
        if (user.permissions.has('ADMINISTRATOR')) return message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`Vous ne pouvez pas kick un Administrateur !`)
                .setColor("#e74c3c")
            ]
        });
        user.kick({ reason: reason })
        .catch(err => {
            return message.channel.send({ 
                embeds: [
                    new MessageEmbed()
                    .setDescription(`**Erreur !**\nVous ne pouvez pas kick cet utilisateur.\n\n[Informations Complémentaires](https://natoune.tk/p/${err}&source=pixelbot)`)
                    .setColor("#e74c3c")
                ]
            });
        });
        message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`**<@${user.id}>** a été kick par <@${message.author.id}> pour la raison:\n\`${reason}\``)
            ]
        });
        message.delete();
    } else {
        return message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`**Utilisateur Invalide !**\nUtilisation: \`${settings.prefix}${MESSAGES.COMMANDS.MODERATION.KICK.usage}\`\n${MESSAGES.COMMANDS.MODERATION.KICK.usage_details}`)
                .setColor("#e74c3c")
            ]
        });
    }
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.KICK;