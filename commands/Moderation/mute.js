const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args, settings) => {
    const user = message.mentions.members.first();
    let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
    let muteTime = (args[1] || '60s');

    if (!user) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`**Utilisateur Invalide !**\nUtilisation: \`${settings.prefix}${MESSAGES.COMMANDS.MODERATION.KICK.usage}\`\n${MESSAGES.COMMANDS.MODERATION.KICK.usage_details}`)
            .setColor("#e74c3c")
        ]
    });

    if (user.permissions.has('ADMINISTRATOR')) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`Vous ne pouvez pas bannir un Administrateur !`)
            .setColor("#e74c3c")
        ]
    });

    // Création du rôle de mute
    if (!muteRole) {
        muteRole = await message.guild.roles.create({
            name: 'muted',
            color: '#99aab5',
            permissions: []
        });

        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.permissionOverwrites.create(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false
            });
        });
    }

    await user.roles.add(muteRole.id);
    message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`<@${user.id}> a été mute ${ms(ms(muteTime))} par <@${message.author.id}>`)
        ]
    });

    setTimeout(() => {
        user.roles.remove(muteRole.id);
    }, ms(muteTime));
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.MUTE;