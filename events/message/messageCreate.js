const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
    let settings = false;
    let dbModules = false;
    let dbUser = false;
    
    if (message.author.system) return; // Auteur message != système

    if (message.guild && message.guild != undefined) { // SI pas DM
        settings = await client.getGuild(message.guild);
        dbModules = await client.getModules(message.guild);
        dbUser = await client.getUser(message.member);

        if (!dbUser) await client.createUser({
            guildID: message.member.guild.id,
            guildName: message.member.guild.name,
            userID: message.member.id,
            username: message.member.user.tag
        });

        if (message.author.bot) return;

        /* Levels */
        if (dbModules.experience) {
            const expCd = Math.floor(Math.random() * 19) + 1; // 1 - 20
            const expToAdd = Math.floor(Math.random() * 25) + 10; // 10 - 35

            if (expCd >= 8 && expCd <= 11) await client.addExp(client, message.member, expToAdd);

            const userLevel = Math.floor(0.1 * Math.sqrt(dbUser.experience)); // √(XP user) * 0.1 ==== Niveau user

            if (dbUser.level < userLevel) {
                message.channel.send(`Bravo <@${message.author.id}>, tu passe niveau **${userLevel}** !`);
                client.updateUser(message.member, { level: userLevel });
            }
        }

    }

    if (message.author.bot) return;
    if (!message.content.startsWith(settings.prefix)) return; // Message != commande

    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    /* Vérifier module */
    if (message.guild && message.guild != undefined) {
        if (dbModules[command.help.category] === false) return;
    }

    /* Vérifier args */
    if (command.help.args && !args.length) {
        return message.channel.send({ 
            embeds: [
                new MessageEmbed()
                .setDescription(`**Arguments Invalides !**\nUtilisation: \`${settings.prefix}${command.help.usage}\`\n${command.help.usage_details}`)
                .setColor("#e74c3c")
            ]
        });
    }

    /* Guild Only */
    if (command.help.guild_only && (message.channel.type==="dm"||message.channel.type==="group")) return

    /* Permissions ADMIN */
    if (command.help.permissions !== false && !message.member.permissions.has(command.help.permissions)) return message.reply("Vous n'avez pas la permission d'exécuter cette commande !");

    command.run(client, message, args, settings, dbUser);
}