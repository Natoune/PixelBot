const { MessageEmbed } = require('discord.js');
module.exports = (client, queue, track) => {
    queue.metadata.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`🎶 Je lance **${track.title}** !`)
        ]
    });
}