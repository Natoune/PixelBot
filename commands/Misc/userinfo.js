const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../utils/constants');

module.exports.run = (client, message, args) => {
    var user = message.mentions.members.first();
    if (!user || user == undefined) user = message.member;
    var permissionsList = [ 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS_AND_STICKERS', 'USE_APPLICATION_COMMANDS', 'REQUEST_TO_SPEAK', 'CREATE_PUBLIC_THREADS', 'CREATE_PRIVATE_THREADS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS' ];
    var permissionsDesc = [ 'Inviter des gens', 'Expluser des membres', 'Bannir des membres', 'Gérer les salons', 'Gérer le serveur', 'Ajouter des réactions', 'Voir les Logs', 'Voix prioritaire', 'Streamer sur le serveur', 'Voir les salons', 'Envoyer des messages', 'Envoyer des messages TTS', 'Gérer les messages', 'Envoyer des liens', 'Attacher des documents', 'Voir les anciens messages', 'Mentionner @everyone', 'Utiliser des émojis externes', 'Voir les statistiques du serveur', 'Se connecter aux salons vocaux', 'Parler', 'Mute des membres', 'Mettre des membres en sourdine', 'Déplacer des membres', 'Utiliser la détection de la voix', 'Changer de Pseudo', 'Gérer les Pseudos', 'Gérer les rôles', 'Gérer les Webhooks', 'Ajouter des émojis/stickers', 'Utiliser les commandes Slash', 'Demander à parler dans les conférences', 'Créer un fil publique', 'Créer un fil privé', 'Utiliser des stickers externes', 'Envoyer des messages dans les threads' ];
    var permissions = "";
    if (!user.permissions.has('ADMINISTRATOR')) {
        for (var i = 0; i < permissionsList.length; i++) {
            if (user.permissions.has(permissionsList[i])) permissions += permissionsDesc[i] + ", ";
        }
    } else {
        permissions = 'Administrateur++';
    }
    permissions = permissions.substring(0, permissions.length-2);
    var s_date = user.joinedAt;
    var s_day = String(s_date.getDate()).padStart(2, '0');
    var s_month = String(s_date.getMonth() + 1).padStart(2, '0');
    var s_year = s_date.getFullYear();
    var s_hour = s_date.getHours().toString();
    var s_min = s_date.getMinutes().toString();
    if (s_hour.length == 1) s_hour="0"+s_hour
    if (s_min.length == 1) s_min="0"+s_min
    /**/
    var j_date = user.user.createdAt;
    var j_day = String(j_date.getDate()).padStart(2, '0');
    var j_month = String(j_date.getMonth() + 1).padStart(2, '0');
    var j_year = j_date.getFullYear();
    var j_hour = j_date.getHours().toString();
    var j_min = j_date.getMinutes().toString();
    if (j_hour.length == 1) j_hour="0"+j_hour
    if (j_min.length == 1) j_min="0"+j_min
    message.channel.send({ 
        embeds: [
            new MessageEmbed()
            .setAuthor(user.user.username, user.user.displayAvatarURL())
            .addFields(
                { name: user.user.tag, value: "ID: " + user.id, inline: true },
                { name: 'A rejoint le serveur le ', value: `${s_day}/${s_month}/${s_year} à ${s_hour}:${s_min}`, inline: true },
                { name: 'A rejoint Discord le ', value: `${j_day}/${j_month}/${j_year} à ${j_hour}:${j_min}`, inline: true },
                { name: 'Permissions', value: permissions },
            )
        ]
    });
}

module.exports.help = MESSAGES.COMMANDS.MISC.USERINFO;