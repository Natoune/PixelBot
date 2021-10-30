const { MESSAGES } = require('../../utils/constants');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
  const getSetting = args[0];
  const newSetting = args.slice(1).join(" ");
  
  switch(getSetting) {
    case "prefix": {
      if (newSetting) {
        if (newSetting.length > 20) return message.channel.send({ 
          embeds: [
            new MessageEmbed()
            .setDescription(`**Le prefix doit faire moins de 20 caractères !**`)
            .setColor("#e74c3c")
          ]
        });
        await client.updateGuild(message.guild, { prefix: newSetting });
        return message.channel.send(`Prefix mis à jour: \`${settings.prefix}\` => \`${newSetting}\``);
      }
      message.channel.send(`Prefix actuel: \`${settings.prefix}\``);
      break;
    }
    case "logChannel": {
      if (newSetting) {
        await client.updateGuild(message.guild, { logChannel: newSetting });
        return message.channel.send(`Salon des logs mis à jour: <#${settings.logChannel}> => <#${newSetting}>`);
      }
      message.channel.send(`Salon des logs actuel: <#${settings.logChannel}>`);
      break;
    }
    case "welcomeMessage": {
      if (newSetting) {
        await client.updateGuild(message.guild, { welcomeMessage: newSetting });
        return message.channel.send(`Message de bienvenue mis à jour: \`${settings.welcomeMessage}\` => \`${newSetting}\``);
      }
      message.channel.send(`Message de bienvenue actuel: \`${settings.welcomeMessage}\``);
      break;
    }
    default: {
      return message.channel.send({ 
        embeds: [
          new MessageEmbed()
          .setDescription(`**Arguments Invalides !**\nLe paramètre \`${getSetting}\` n'est pas reconnu.`)
          .setColor("#e74c3c")
        ]
      });
    }
  }
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.CONFIG;