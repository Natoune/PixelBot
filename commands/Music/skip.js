const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Il n'y a encore aucune musique dans la file d'attente !\nPour rajouter une musique, faites \`${settings.prefix}play <Musique>\``)
            .setColor("#e74c3c")
        ]
    });

    const success = queue.skip();
    return message.channel.send(success ? { 
        embeds: [
            new MessageEmbed()
            .setDescription(`**${queue.current.title}** a été passé !`)
        ]
    } : { 
        embeds: [
            new MessageEmbed()
            .setDescription(`Une erreur est survenue, veuillez réessayer !`)
            .setColor("#e74c3c")
        ]
    });
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.SKIP;