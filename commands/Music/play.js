const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    const q = args.join(' ');

    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Résultats de la Recherche \`${q}\``)

    if (voiceChannel) {

        const player = client.music.create({
            guild: message.guild.id,
            voiceChannel: voiceChannel.id,
            textChannel: message.channel.id,
        });

        player.connect();

        client.musicPlayer.set(message.guild.id, player);

        try {
            let trackNumber = 0;
            const musicSearchResults = await client.music.search(q, message.author);
            const tracks = await musicSearchResults.tracks.slice(0, 5);
            tracks.map(r => embed.addField(`${++trackNumber} - ${r.title}`, r.uri));

            message.channel.send({ embeds: [embed] });

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);
            console.log("DEBUG");
            const userEntry = await message.channel.awaitMessages(filter, { max: 1, time: 5000, error:['time'] });
            console.log(userEntry.first().content);

            if (userEntry) {
                const musicSelection = userEntry.first().content;
                const getMusicPlayer = client.musicPlayer.get(message.guild.id);
                const track = tracks[musicSelection-1];
                await getMusicPlayer.queue.add(track);
                if (!player.playing && !player.paused) {
                    player.play();
                }
            }
        } catch (e) {
            console.log(e);
            message.channel.send('Erreur !\nLe système de musique est en train de démarrer... Réessayez dans quelques secondes');
        }
    } else {
        message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`Vous devez rejoindre un salon vocal avant de faire cette commande !`)
                .setColor("#e74c3c")
            ]
        });
    }
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.PLAY;