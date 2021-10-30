const { MESSAGES } = require('../../utils/constants');

module.exports.run = (client, message, args, settings) => {
    const argMessage = message.content.replace(settings.prefix+"say ", "").replace(settings.prefix+"repeat ", "").replace(settings.prefix+"rep ", "");
    message.channel.send(argMessage);
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.SAY;