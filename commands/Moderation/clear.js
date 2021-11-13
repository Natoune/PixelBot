const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Vous devez spécifier un nombre entre 1 et 100 !`)
            .setColor("#e74c3c")
        ]
    });
    
    const messages = await message.channel.messages.fetch({
        limit: Math.min(args[0]+1, 101)
    });
    
    await message.channel.bulkDelete(messages);

    message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`${args[0]} messages ont été supprimés !`)
        ]
    });
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.CLEAR;