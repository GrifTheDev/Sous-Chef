const { MessageEmbed } = require("discord.js");
const botConfig = require("../../bot.config");
const suggestionDB = require("../schemas/suggestion_schema");
const { sendDiscordLog } = require("../scripts/helpers/discordLogging");
const randomId = require("../scripts/helpers/randomString");

class SuggestionManager {
  constructor({
    interaction: interaction,
    title: title,
    desc: desc,
    client: client,
    suggestionId: suggesstionId,
  }) {
    this.interaction = interaction;

    this.suggestionChannel = this.interaction.guild.channels.cache.get(
      botConfig.channels.suggestionChannel
    );

    this.title = title || undefined;
    this.desc = desc || undefined;

    this.startedTimestamp = Date.now();
    this.userTag = this.interaction.user.tag;
    this.userAvatar = this.interaction.user.displayAvatarURL();
    this.suggestionId = suggesstionId || undefined;
    this.client = client;
  }

  async sendEmbed() {
    await this.interaction.followUp({
      content: `${botConfig.emojis.loading} Creating suggestion embed (1/4)...`,
    });

    this.suggestionId == undefined
      ? (this.suggestionId = randomId(7))
      : (this.suggestionId = this.suggestionId);
    let suggestionEmbed = new MessageEmbed()
      .setAuthor({ name: this.userTag, iconURL: this.userAvatar })
      .setColor("YELLOW")
      .setTitle(this.title)
      .addFields(
        {
          name: "Suggestion",
          value: this.desc,
        },
        {
          name: "Suggestion Created At",
          value: `<t:${Math.trunc(Date.now() / 1000)}:f>`,
        },
        {
          name: "Suggestion Status",
          value: `${botConfig.emojis.pendingReview} Pending Moderator Review`, // Add possible moderator opinons and stuff like that
        }
      )
      .setFooter({ text: `Suggestion ID: ${this.suggestionId}` });

    await this.interaction.editReply({
      content: `${botConfig.emojis.loading} Sending suggestion (2/4)...`,
    });

    let message = await this.suggestionChannel.send({
      embeds: [suggestionEmbed],
    });

    await this.interaction.editReply({
      content: `${botConfig.emojis.loading} Adding reactions (3/4)...`,
    });

    await message.react("928690859929636885");
    await message.react("928690859866730550");

    await this.interaction.editReply({
      content: `${botConfig.emojis.loading} Sending suggestion payload to the database (4/4)...`,
    });

    await this.sendDataToDB(message);

    await this.interaction.editReply({
      content:
        `${botConfig.emojis.tick} Your [suggestion](${message.url}) (` +
        "`" +
        this.suggestionId +
        "`" +
        `) has been successfully submited in ${(
          (Date.now() - this.startedTimestamp) /
          1000
        ).toFixed(2)} seconds.`,
    });

    await sendDiscordLog({
      action: botConfig.actions.suggestionSubmitted,
      color: "ORANGE",
      client: this.client,
      user: this.interaction.user,
      notes: `Find the suggesstion [here](${message.url}).`,
      title: "Suggesstion Submitted",
    });
  }

  async sendDataToDB(message) {
    await suggestionDB.create({
      _id: this.suggestionId,
      userId: this.interaction.user.id,
      messageId: message.id,
      avatarURL: this.userAvatar,
      reason: "N/A",
      suggestion: {
        title: this.title,
        desc: this.desc,
        id: this.suggestionId,
        status: "Pending",
      },
      timestamp: `<t:${Math.trunc(Date.now() / 1000)}:f>`,
    });
  }

  async approveSuggestion(reason) {
    let suggestionEntry = await suggestionDB.findOne({
      _id: this.suggestionId,
    });

    let suggestionUser = this.interaction.guild.members.cache.get(
      suggestionEntry.userId
    );

    let newEmbed = new MessageEmbed()
      .setAuthor({
        name: suggestionUser.user.tag,
        iconURL: suggestionEntry.avatarURL,
      })
      .setColor("GREEN")
      .setTitle(suggestionEntry.suggestion.title)
      .addFields(
        {
          name: "Suggestion",
          value: suggestionEntry.suggestion.desc,
        },
        {
          name: "Suggestion Created At",
          value: `${suggestionEntry.timestamp}`,
        },
        {
          name: "Reason",
          value: reason,
        },
        {
          name: "Suggestion Status",
          value: `${botConfig.emojis.tick} Approved`, // Add possible moderator opinons and stuff like that
        }
      )
      .setFooter({ text: `Suggestion ID: ${suggestionEntry.suggestion.id}` });

    await (
      await this.interaction.channel.messages.fetch(suggestionEntry.messageId)
    ).edit({
      content: " ",
      embeds: [newEmbed],
    });

    suggestionEntry.suggestion.status = "Approved";
    suggestionEntry.reason = reason;
    await suggestionEntry.save();
    await this.interaction.followUp({
      content: `${botConfig.emojis.tick} Successfully approved suggestion.`,
    });

    let hasDM = true

    try {
      await this.interaction.guild.members.cache.get(suggestionEntry.userId).send({
        embeds: [new MessageEmbed().setColor("GREEN").setDescription(`Your suggestion in Foodkins has been approved. Thank you for making our community a better place! <3`)]
      })
    } catch (error) {
      hasDM = false
    }

    await sendDiscordLog({
      action: botConfig.actions.suggestionApproved,
      color: "GREEN",
      client: this.client,
      user: this.interaction.user,
      notes: "Member Notified: `" + hasDM + "`",
      title: "Suggesstion Approved",
    });
  }

  async denySuggestion(reason) {
    let suggestionEntry = await suggestionDB.findOne({
      _id: this.suggestionId,
    });

    let suggestionUser = this.interaction.guild.members.cache.get(
      suggestionEntry.userId
    );

    let newEmbed = new MessageEmbed()
      .setAuthor({
        name: suggestionUser.user.tag,
        iconURL: suggestionEntry.avatarURL,
      })
      .setColor("RED")
      .setTitle(suggestionEntry.suggestion.title)
      .addFields(
        {
          name: "Suggestion",
          value: suggestionEntry.suggestion.desc,
        },
        {
          name: "Suggestion Created At",
          value: `${suggestionEntry.timestamp}`,
        },
        {
          name: "Reason",
          value: reason,
        },
        {
          name: "Suggestion Status",
          value: `${botConfig.emojis.x} Denied`, // Add possible moderator opinons and stuff like that
        }
      )
      .setFooter({ text: `Suggestion ID: ${suggestionEntry.suggestion.id}` });

    await (
      await this.interaction.channel.messages.fetch(suggestionEntry.messageId)
    ).edit({
      content: " ",
      embeds: [newEmbed],
    });

    suggestionEntry.suggestion.status = "Denied";
    suggestionEntry.reason = reason;
    await suggestionEntry.save();
    await this.interaction.followUp({
      content: `${botConfig.emojis.tick} Successfully denied suggestion.`,
    });

    let hasDM = true

    try {
      await this.interaction.guild.members.cache.get(suggestionEntry.userId).send({
        embeds: [new MessageEmbed().setColor("RED").setDescription(`Unfortunatelly, your suggestion in Foodkins has been denied. Don't let that discourage you from submitting suggestions in the future, as every suggestion gets it's own review. <3`)]
      })
    } catch (error) {
      hasDM = false
    }

    await sendDiscordLog({
      action: botConfig.actions.suggestionDeined,
      color: "RED",
      client: this.client,
      user: this.interaction.user,
      notes: "Member Notified: `" + hasDM + "`",
      title: "Suggesstion Denied",
    });
  }
}

module.exports = SuggestionManager;
