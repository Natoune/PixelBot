const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs')

client.login(process.env.TOKEN)
client.commands = new Discord.Collection()

// MODERATION
fs.readdir('./commands/moderation', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const moderationCommand = require(`./commands/moderation/${file}`)
        client.commands.set(moderationCommand.name, moderationCommand)
    })
})

// UTILS
fs.readdir('./commands/utils', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const utilsCommand = require(`./commands/utils/${file}`)
        client.commands.set(utilsCommand.name, utilsCommand)
    })
})

// LEVELS
client.on('message', async message => {

    if (message.type !== 'DEFAULT' || message.author.bot) return

    if (message.content.startsWith(config.prefix)) return

})

fs.readdir('./commands/levels', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const utilsCommand = require(`./commands/levels/${file}`)
        client.commands.set(utilsCommand.name, utilsCommand)
    })
})

/* LANCER LES COMMANDES */

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return // vérifie le type du message

    const args = message.content.trim().split(/ +/g) // récupère les arguments
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return // vérifie le préfix
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) {
        message.channel.send("Cette commande n'existe pas !\nTapez `" + config.prefix + "help` pour obtenir la liste des commandes disponibles.")
        return
    }
    if (command.guildOnly && !message.guild) return
    command.run(message, args, client)
})

client.on('ready', () => {
    const statuses = [
        () => `https://pixelbot.tk/`,
        () => `?help`,
        // () => `${client.guilds.cache.size} serveurs`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'WATCHING'})
        i = ++i % statuses.length
    }, 1e4)
})