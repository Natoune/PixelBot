const { Client, Intents, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require('./utils/loader');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});
require('./utils/functions')(client);
client.config = require('./config');
client.commands = new Collection();
client.mongoose = require('./utils/mongoose');

/* MUSIC PLAYER */
const { Player } = require("discord-player");
client.player = new Player(client, {
    leaveOnEmpty: false,
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

/* Charger commandes / Events */
console.log('\x1b[35mInitialisation des Commandes:\x1b[0m');
loadCommands(client);
loadEvents(client);
console.log('\x1b[35m—————————————————————————————\x1b[0m')

/* Mongoose */
client.mongoose.init();

/* LOGIN */
client.login(process.env.TOKEN)

/* DASHBOARD */
require('./dashboard.js')(client);