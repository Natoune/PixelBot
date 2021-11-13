const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    const user = await client.users.fetch(args[0]);
    
    if (user) {
        message.guild.members.unban(user)
        message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`**<@${user.id}>** a été débanni par <@${message.author.id}>`)
            ]
        });
    } else {
        return message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`**ID d'Utilisateur Invalide !**\nUtilisation: \`${settings.prefix}${MESSAGES.COMMANDS.MODERATION.KICK.usage}\`\n${MESSAGES.COMMANDS.MODERATION.KICK.usage_details}`)
                .setColor("#e74c3c")
            ]
        });
    }
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNBAN;