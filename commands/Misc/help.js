const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands');

module.exports.run = (client, message, args, settings) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) categoryList.shift();
    if (!args.length) {
        const embed = new MessageEmbed()
        .addField('Commandes PixelBot', `Liste des commandes disponibles\nPour plus d'informations sur une commande, tapez \`${settings.prefix}help [Commande]\``)
    
        for (const category of categoryList) {
            embed.addField(
                `${category}:`,
                `_ _${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => "\`"+settings.prefix+cmd.help.usage+"\`\n"+cmd.help.description).join('\n')}`
            )
        }

        message.channel.send({
            embeds: [ embed ]
        });
    } else {
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
        let aliases = '';
        let commandArgs = '';
        command.help.aliases.forEach(alias => aliases+=`${settings.prefix}${alias} - `);
        aliases = aliases.substring(0, aliases.length-3);
        if (command.help.usage_details) commandArgs = `\n\nArguments:\n${command.help.usage_details}`;

        const embed = new MessageEmbed()
        .setTitle(`**__${command.help.name}__**`)
        .addField('_ _', `\`${settings.prefix}${command.help.usage}\`\n${command.help.description}\nAlias: \`${aliases}\`${commandArgs}`)

        message.channel.send({
            embeds: [ embed ]
        });
    }
}

module.exports.help = MESSAGES.COMMANDS.MISC.HELP;