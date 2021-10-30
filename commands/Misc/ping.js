const { MESSAGES } = require('../../utils/constants');

module.exports.run = (client, message, args) => {
    var t = Date.now() - message.createdTimestamp;
    t = t.toString().replace("-", "");
    message.channel.send(`
        Pong !\n${message.author} a un ping de \`${t} ms\`.`
    );
}

module.exports.help = MESSAGES.COMMANDS.MISC.PING;