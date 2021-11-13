const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    const queue = client.player.getQueue(message.guild.id);
    const maxVol = 100;

    if (!queue || !queue.playing) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Il n'y a encore aucune musique dans la file d'attente !\nPour rajouter une musique, faites \`${settings.prefix}play <Musique>\``)
            .setColor("#e74c3c")
        ]
    });

    const vol = parseInt(args[0]);

    if (!vol) return message.channel.send({
        embeds: [
            new MessageEmbed()
            .setDescription(`Le volume est à ${queue.volume}% 🔊\nPour modifier le volume, spécifiez un nombre entre **1** et **${maxVol}**.`)
        ]
    });
    if (queue.volume === vol) return message.channel.send({
        embeds: [
            new MessageEmbed()
            .setDescription(`Le volume est déjà à ${queue.volume}% !`)
            .setColor("#e74c3c")
        ]
    });
    if (vol < 0 || vol > maxVol) return message.channel.send({
        embeds: [
            new MessageEmbed()
            .setDescription(`Le volume spécifié doit être un nombre entre **1** et **${maxVol}**...`)
            .setColor("#e74c3c")
        ]
    });

    const success = queue.setVolume(vol);
    return message.channel.send(success ? {
        embeds: [
            new MessageEmbed()
            .setDescription(`Le volume est maintenant à **${vol}**/**${maxVol}**% 🔊`)
        ]
    } : {
        embeds: [
            new MessageEmbed()
            .setDescription(`Hmmm, il semblerait que quelque chose ne se soit pas passé comme prévu...`)
            .setColor("#e74c3c")
        ]
    });
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.VOLUME;