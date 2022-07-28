const { MessageEmbed } = require("discord.js")
const botConfig = require("../../../bot.config")

async function sendDiscordLog({ title: title, action: action, color: color, user: user, client: client, notes: notes }) {

    let actionedBy = user == undefined ? "Automatic Systems" : `<@${user.id}>`
    
    notes == undefined ? notes = "*No notes specified.*" : notes = notes

    let logEmbed = new MessageEmbed()
    .setTitle(title)
    .setAuthor({
        name: user == undefined ? "Sous-Chef" : user.username,
        iconURL: user == undefined ? "https://cdn.discordapp.com/embed/avatars/0.png" : user.avatarURL()
    })
    .addFields({
        name: "Actioned By",
        value: actionedBy
    }, {
        name: "Timestamp",
        value: `<t:${Math.trunc(Date.now() / 1000)}:f>`
    }, {
        name: "Action",
        value: action
    }, {
        name: "Notes",
        value: notes
    })
    .setColor(color)

    await client.channels.cache.get(botConfig.channels.logChannel).send({
        embeds: [logEmbed]
    })
}

module.exports = {
    sendDiscordLog: sendDiscordLog
}