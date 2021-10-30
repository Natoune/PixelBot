const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args, settings) => {
    var member = message.mentions.members.first();
    if (!member || member == undefined) member = message.member;
    const expToAdd = parseInt(args[1]) || parseInt(args[0]);
    if (isNaN(expToAdd)) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`**Arguments Invalides !**\nJe ne peux pas ajouter ${args[0]} points voyons, ce n'est pas un nombre !\nUtilisation: \`${settings.prefix}${MESSAGES.COMMANDS.EXPERIENCE.ADDXP.usage}\`\n${MESSAGES.COMMANDS.EXPERIENCE.ADDXP.usage_details}`)
            .setColor("#e74c3c")
        ]
    });
    client.addExp(client, member, expToAdd);
    message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`${expToAdd} points on été ajouté à <@${member.id}> !`)
        ]
    });
}

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.ADDXP;