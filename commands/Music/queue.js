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

    const embed = new MessageEmbed();
    const methods = ['', '🔁', '🔂'];

    embed.setColor('BLUE');
    embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
    embed.setAuthor(`File d'attente - ${message.guild.name} ${methods[queue.repeatMode]}`);

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author}\n(demandé par: ${track.requestedBy.username})`);

    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `Et **${songs - 5}** autre(s)...` : `Il reste **${songs}** son(s) dans la file d'attente...`;

    embed.setDescription(`Musique actuelle **${queue.current.title}**\n\n**Musiques à suivre:**\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

    message.channel.send({ embeds: [embed] });
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.QUEUE;