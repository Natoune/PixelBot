const MESSAGES = {
    COMMANDS: {
        ADMIN: {
            EVAL: {
                name: 'eval',
                aliases: [''],
                category: 'admin',
                args: true,
                guild_only: false,
                permissions: 'BAN_MEMBERS',
                description: 'ᴄ̲̮̾͡ᴏ̴͖ͤ͆ᴍ̡̗̫̤̐ᴍ̸̛͉̱ͧᴀ̠͔̿͘̕ɴ̢̩͈ͤͨ͜ᴅ̹ͧ̌͢͠ᴇ̧̛̜̾ͅ ̣ͧ͢s̡̤͋͐͠ᴇ̸̺ͯͬ̐ᴄ͓͗́͡ʀ̴̜ͥ̾̑ę̫̜̀ͪͣ͢ᴛ̴̠̐͂ͬ͟ᴇ̫ͯ̓̕͠',
                usage: 'eval <code>',
                usage_details: '<code> (requis): Code à tester'
            },
            CONFIG: {
                name: 'config',
                aliases: ['settings'],
                category: 'admin',
                args: true,
                guild_only: true,
                permissions: 'BAN_MEMBERS',
                description: 'Configurer le serveur',
                usage: 'config <paramètre> <valeur>',
                usage_details: '<paramètre> (requis): Paramètre à modifier\n<valeur> (requis): Valeur du paramètre'
            },
            SAY: {
                name: 'say',
                aliases: ['repeat', 'rep'],
                category: 'admin',
                args: true,
                guild_only: true,
                permissions: 'BAN_MEMBERS',
                description: 'Renvoie votre un message',
                usage: 'say <message>',
                usage_details: '<message> (requis): Message a envoyer'
            }
        },
        EXPERIENCE: {
            ADDXP: {
                name: 'add-xp',
                aliases: ['addxp', 'add-points'],
                category: 'experience',
                args: true,
                guild_only: true,
                permissions: 'BAN_MEMBERS',
                description: 'Ajouter des points à un joueur',
                usage: 'add-xp [Utilisateur] <Points>',
                usage_details: '[Utilisateur]: Utilisateur cible (laisser vide pour vous rajouter des points vous-même)\n<Points> (requis): Nombre de points à rajouter'
            },
            LEVEL: {
                name: 'level',
                aliases: ['levels', 'xp', 'rank'],
                category: 'experience',
                args: false,
                guild_only: true,
                permissions: false,
                description: 'Renvoie le niveau d\'un joueur',
                usage: 'level [Utilisateur]',
                usage_details: '[Utilisateur]: Utilisateur cible (laisser vide pour voir vos points)'
            },
            REMOVEXP: {
                name: 'remove-xp',
                aliases: ['removexp', 'remove-points'],
                category: 'experience',
                args: true,
                guild_only: true,
                permissions: 'BAN_MEMBERS',
                description: 'Ajouter des points à un joueur',
                usage: 'remove-xp [Utilisateur] <Points>',
                usage_details: '[Utilisateur]: Utilisateur cible (laisser vide pour vous retirer des points vous-même)\n<Points> (requis): Nombre de points à retirer'
            }
        },
        MISC: {
            HELP: {
                name: 'help',
                aliases: ['commands', 'command'],
                category: 'misc',
                args: false,
                guild_only: false,
                permissions: false,
                description: 'Affiche l\'aide sur les commandes',
                usage: 'ping [Commande]',
                usage_details: '[Commande]: Commande à afficher'
            },
            PING: {
                name: 'ping',
                aliases: ['latency'],
                category: 'misc',
                args: false,
                guild_only: false,
                permissions: false,
                description: 'Renvoie votre latence actuelle en millisecondes',
                usage: 'ping',
                usage_details: ''
            },
            USERINFO: {
                name: 'userinfo',
                aliases: ['user-info', 'user'],
                category: 'misc',
                args: false,
                guild_only: true,
                permissions: false,
                description: 'Donne des informations sur un utilisateur',
                usage: 'userinfo [Utilisateur]',
                usage_details: '[Utilisateur]: Utilisateur cible (laisser vide pour voir vos propres informations)'
            }
        },
        MUSIC: {
            PLAY: {
                name: 'play',
                aliases: ['song'],
                category: 'music',
                args: true,
                guild_only: true,
                permissions: false,
                description: 'Joue une musique dans un salon vocal 🎵',
                usage: 'play [Musique]',
                usage_details: '[Musique]: Nom de la musique a jouer'
            }
        }
    }
}

exports.MESSAGES = MESSAGES;