const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');
const yts = require( 'yt-search' )

module.exports.run = async (client, message, args, settings) => {
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

    const query = args.join(' ');
    let queue = client.player.getQueue(message.guild.id);
    if (!queue) queue = client.player.createQueue(message.guild, {
        metadata: {
            channel: message.channel
        }
    });
    
    try {
        if (!queue.connection) await queue.connect(voiceChannel);
    } catch {
        queue.destroy();
        return message.channel.send("Could not join your voice channel!");
    }

    let results_embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`Voici les 5 premiers résultats de recherche pour \`${query}\`\nChoisissez la musique à jouer en faisant \`${settings.prefix}choose <numéro>\``)

    const q = await yts(query);
    const tracks = q['all'].slice(0, 5);

    let trackNumber = 0;
    await tracks.map(r => results_embed.addField(++trackNumber+" - "+r.title, r.url));
    message.channel.send({ embeds: [results_embed] });

    try {
        const filter = m => (message.author.id === m.author.id) && (m.content.split(' ')[1] >= 1 && m.content.split(' ')[1] <= trackNumber) && m.content.startsWith(settings.prefix+'choose');
        const userEntry = await message.channel.awaitMessages({
            filter, max: 1, time: 20_000, errors: ['time']
        });

        if (userEntry) {
            const entry = userEntry.first().content.split(' ')[1];
            const track = await client.player.search(q['all'][entry-1]['url'], {
                requestedBy: message.author
            }).then(x => x.tracks[0]);
            if (!track) return message.channel.send({ 
                embeds: [
                    new MessageEmbed()
                    .setDescription(`Je ne peux pas lancer cette musique !`)
                    .setColor("#e74c3c")
                ]
            });
    
            queue.play(track);
            return message.channel.send({ 
                embeds: [
                    new MessageEmbed()
                    .setDescription(`[${track['title']}](${track['url']}) a été ajouté à la file d'attente !`)
                ]
            });
        }
    } catch (e) {
        console.log(e);
        return message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`Aucune réponse ? Bien, je ne jouerais rien alors...`)
                .setColor("#e74c3c")
            ]
        });
    }
}

module.exports.help = MESSAGES.COMMANDS.MUSIC.PLAY;