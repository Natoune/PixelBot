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
                usage_details: '<code>: ̣ͧ͢s̡̤͋͐͠ᴇ̸̺ͯͬ̐ᴄ͓͗́͡ʀ̴̜ͥ̾̑ę̫̜̀ͪͣ͢ᴛ̴̠̐͂ͬ͟'
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
                description: 'Renvoie votre message',
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
                description: 'Ajouter des points à un utilisateur',
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
                description: 'Renvoie le niveau d\'un utilisateur',
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
                description: 'Ajouter des points à un utilisateur',
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
                usage: 'help [Commande]',
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
                usage: 'userinfo <Utilisateur>',
                usage_details: '<Utilisateur> (requis): Utilisateur cible (laisser vide pour voir vos propres informations)'
            }
        },
        MODERATION: {
            BAN: {
                name: 'ban',
                aliases: [],
                category: 'moderation',
                args: true,
                guild_only: true,
                permissions: 'BAN_MEMBERS',
                description: 'Banni un membre du serveur',
                usage: 'ban <Utilisateur> [Raison]',
                usage_details: '<Utilisateur> (requis): Utilisateur cible\n[Raison]: Raison du ban'
            },
            CLEAR: {
                name: 'clear',
                aliases: ['clean', 'purge'],
                category: 'moderation',
                args: true,
                guild_only: true,
                permissions: 'MANAGE_MESSAGES',
                description: 'Supprimer un grand nombre de messages',
                usage: 'clear <Nombre> [Utilisateur]',
                usage_details: '<Nombre> (requis): Nombre de messages à supprimer (1-100)\n[Utilisateur]: Utilisateur cible'
            },
            KICK: {
                name: 'kick',
                aliases: [],
                category: 'moderation',
                args: true,
                guild_only: true,
                permissions: 'KICK_MEMBERS',
                description: 'Expulse un membre du serveur',
                usage: 'kick <Utilisateur> [Raison]',
                usage_details: '<Utilisateur> (requis): Utilisateur cible\n[Raison]: Raison du kick'
            },
            MUTE: {
                name: 'mute',
                aliases: [],
                category: 'moderation',
                args: true,
                guild_only: true,
                permissions: 'MANAGE_MESSAGES',
                description: 'Rendre muet un membre du serveur',
                usage: 'mute <Utilisateur>',
                usage_details: '<Utilisateur> (requis): Utilisateur cible'
            },
            UNBAN: {
                name: 'unban',
                aliases: [],
                category: 'moderation',
                args: true,
                guild_only: true,
                permissions: 'BAN_MEMBERS',
                description: 'Débannir un membre du serveur',
                usage: 'unban <ID Utilisateur>',
                usage_details: '<ID Utilisateur> (requis): ID de l\'utilisateur cible (Clique droit, copier l\'identifiant)'
            },
            UNMUTE: {
                name: 'unmute',
                aliases: [],
                category: 'moderation',
                args: true,
                guild_only: true,
                permissions: 'MANAGE_MESSAGES',
                description: 'Redonne la permission à un membre muet de parler',
                usage: 'unmute <Utilisateur>',
                usage_details: '<Utilisateur> (requis): Utilisateur cible'
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
                usage: 'play <Musique>',
                usage_details: '<Musique> (requis): Nom de la musique a jouer'
            },
            QUEUE: {
                name: 'queue',
                aliases: [],
                category: 'music',
                args: false,
                guild_only: true,
                permissions: false,
                description: 'Affiche la file d\'attente actuelle des musiques 🎵',
                usage: 'queue',
                usage_details: ''
            },
            SKIP: {
                name: 'skip',
                aliases: ['sk'],
                category: 'music',
                args: false,
                guild_only: true,
                permissions: false,
                description: 'Passe une musique de la file d\'attente',
                usage: 'skip',
                usage_details: ''
            }
        }
    }
}

exports.MESSAGES = MESSAGES;