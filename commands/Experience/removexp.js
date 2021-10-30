const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args, settings, dbUser) => {
    var member = message.mentions.members.first();
    if (!member || member == undefined) member = message.member;
    const expToRemove = parseInt(args[0]);
    if (isNaN(expToRemove)) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`**Arguments Invalides !**\nJe ne peux pas retirer ${args[0]} points voyons, ce n'est pas un nombre !\nUtilisation: \`${settings.prefix}${MESSAGES.COMMANDS.EXPERIENCE.ADDXP.usage}\`\n${MESSAGES.COMMANDS.EXPERIENCE.ADDXP.usage_details}`)
            .setColor("#e74c3c")
        ]
    });
    client.removeExp(client, member, expToRemove);
    message.channel.send({ 
        embeds: [new MessageEmbed()
            .setDescription(`${expToRemove} points on été retiré à <@${member.id}> !`)
        ]
    });
}

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.REMOVEXP;