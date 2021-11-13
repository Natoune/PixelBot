const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');
// const ytdl = require('ytdl-core');
// const ytSearch = require('yt-search');

module.exports.run = async (client, message, args) => {
    // return message.channel.send({ 
    //     embeds: [
    //         new MessageEmbed()
    //         .setDescription(`Le module de musique est en **maintenance** !`)
    //         .setColor("#e74c3c")
    //     ]
    // });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Vous devez rejoindre un salon vocal avant de faire cette commande !`)
            .setColor("#e74c3c")
        ]
    });

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Vous n'avez pas la permission de lancer de la musique dans ce salon !`)
            .setColor("#e74c3c")
        ]
    });

    const res = await client.player.search(args[0], {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Aucun résultat trouvé pour la recherche ${args[0]} !`)
            .setColor("#e74c3c")
        ]
    });

    const queue = await client.player.createQueue(message.guild, {
        metadata: message.channel
    });

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await client.player.deleteQueue(message.guild.id);
        return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
    }

    await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.PLAY;