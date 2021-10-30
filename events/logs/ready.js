const { Manager } = require("erela.js");
const { LAVALINK_HOST, LAVALINK_PORT, LAVALINK_PASSWORD } = require('../../config');

module.exports = (client) => {
    console.log("\x1b[4m\x1b[33mBOT DÉMARRÉ\x1b[0m");

    // let activities = ['?help', `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} utilisateurs`, `${client.guilds.cache.size.toString()} serveurs`, `${client.channels.cache.size.toString()} salons`];

    // setInterval(() => client.user.setPresence({
    //     activity: {
    //         name: `${activities[Math.floor(Math.random() * activities.length)]}`,
    //         type: 'WATCHING'
    //     },
    //     status: 'dnd'
    // }), 3000);

    /* MUSIQUE */
    client.music = new Manager({
        nodes: [
          {
            host: LAVALINK_HOST,
            port: LAVALINK_PORT,
            password: LAVALINK_PASSWORD,
          },
        ],
        send(id, payload) {
          const guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
    });
    client.music.on("nodeConnect", node => console.log(`Connecté à Lavalink (${node.options.identifier})`))
    client.music.on("nodeError", (node, error) => console.log(`La connexion à Lavalink (${node.options.identifier}) a échoué: ${error.message}`))

    client.music.init(client.user.id);
}