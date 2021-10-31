module.exports = {
    LAVALINK_HOST: 'localhost',
    LAVALINK_PORT: parseInt(process.env.LAVALINK_PORT),
    LAVALINK_PASSWORD: process.env.LAVALINK_PASSWORD,
    DBCONNECTION: process.env.DBCONNECTION,
    DEFAULTSETTINGS: {
        prefix: '?',
        logChannel: 'aucun',
        welcomeMessage: 'Bienvenue {{user}} sur le serveur {{server}} !',
        experience: 0,
        level: 0
    }
}