module.exports = (client) => {
    console.log("\x1b[4m\x1b[33mBOT DÉMARRÉ\x1b[0m");

    let activities = ['?help', 'https://pixelbot.tk', `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} utilisateurs`, `${client.guilds.cache.size.toString()} serveurs`, `${client.channels.cache.size.toString()} salons`];

    setInterval(() => client.user.setPresence({
        activities: [{
            name: `${activities[Math.floor(Math.random() * activities.length)]}`,
            type: 'WATCHING'
        }],
        status: 'dnd'
    }), 3000);
}