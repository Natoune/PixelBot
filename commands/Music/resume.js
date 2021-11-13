const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Il n'y a encore aucune musique dans la file d'attente !\nPour rajouter une musique, faites \`${settings.prefix}play <Musique>\``)
            .setColor("#e74c3c")
        ]
    });

    const success = queue.setPaused(false);

    return message.channel.send(success ? {
        embeds: [
            new MessageEmbed()
            .setDescription(`**${queue.current.title}** a été mis relancé !`)
        ]
    } : {
        embeds: [
            new MessageEmbed()
            .setDescription(`Hmm, oui, il semblerait que cette musique soit en cours !`)
            .setColor("#e74c3c")
        ]
    });
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.RESUME;