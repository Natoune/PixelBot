const { MESSAGES } = require('../../utils/constants');

module.exports.run = async (client, message, args) => {
    function clean(text) {
        if (typeof text === "string") 
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
      }
     
      if (message.author.id !== "642433303017947146") return;
      const code = args.join(" ");
      const evaled = eval(code);
      const cleanCode = await clean(evaled);
      message.channel.send(cleanCode, { code: "js" });
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.EVAL;