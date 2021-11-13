const { readdirSync } = require('fs');

const loadCommands = (client, dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log("Commande chargée: \x1b[36m" + dirs + "/" + getFileName.help.name + "\x1b[0m");
        }
    })
}

const loadClientEvents = (client, dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith('.js'));

        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log("Événement chargée: \x1b[36m" + dirs + "/" + evtName + "\x1b[0m");
        }
    })
}

const loadPlayerEvents = (client, dir = "./player/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith('.js'));

        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.player.on(evtName, evt.bind(null, client));
            console.log("Événement Player chargée: \x1b[36m" + dirs + "/" + evtName + "\x1b[0m");
        }
    })
}

module.exports = {
    loadCommands,
    loadClientEvents,
    loadPlayerEvents,
}