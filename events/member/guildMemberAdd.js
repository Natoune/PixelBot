module.exports = async (client, member) => {
    const settings = await client.getGuild(member.guild);
    let message = settings.welcomeMessage.toString();
    message = message.replace(/{{user}}/g, `<@${member.id}>`).replace(/{{server}}/g, settings.guildName);
    member.send(message);

    await client.createUser({
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag
    });
}