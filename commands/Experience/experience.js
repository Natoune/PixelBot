const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message) => {
    var member = message.mentions.members.first();
    if (!member || member == undefined) member = message.member;
    const settings = await client.getUser(member);
    const tag = member.user.tag.slice(-4);
    let avatar = member.user.displayAvatarURL().split('/');
    avatar = `${avatar[3]}-${avatar[4]}-${avatar[5]}`;
    if (!settings || settings == undefined) return message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setDescription(`**Erreur**\nVous ne pouvez pas consulter les niveaux de cette personne, elle n'a jamais parlé dans ce serveur !`)
            .setColor("#e74c3c")
        ]
    });
    message.channel.send({files: [`https://natoune.tk/levels-card.png?name=${member.user.username}&tag=${tag}&level=${settings.level}&points=${settings.experience}&avatar=${avatar}&${Math.random()}`]});
}

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.LEVEL;