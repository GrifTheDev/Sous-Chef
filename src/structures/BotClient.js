const { Client, Collection } = require("discord.js");
const { botLogger } = require("../scripts/loggers/botLogger");
const {
  cacheSlashCommands,
} = require("../scripts/slash_commands/cacheSlashCommands");
const term = require("colorette");
const {
  executeSlashCommand,
} = require("../scripts/slash_commands/executeSlashCommands");
const botConfig = require("../../bot.config");
const { moderateNickname } = require("../scripts/helpers/nicknames");
const { sendDiscordLog } = require("../scripts/helpers/discordLogging");
const SelectRoles = require("./SelectRoles");
const SuggestionManager = require("./SuggestionManager");

class BotClient extends Client {
  constructor(options) {
    super(options);

    this.slashCommands = new Collection(); 

    this.on("ready", async (client) => {
      await cacheSlashCommands(this);
      botLogger.info(`Logged in as ${client.user.tag}!`);
    });

    this.on("guildMemberUpdate", async (oldMember, newMember) => {
      if (oldMember.roles.cache.has(botConfig.roles.memberRole)) return;
      if (newMember.pending == false) {
        await newMember.roles.add(botConfig.roles.memberRole);
        await sendDiscordLog({
          action: botConfig.actions.passMembershipScreening,
          color: "GREEN",
          client: this,
          title: "Member Verified",
        });
      }
    });

    this.on("guildMemberAdd", async (member) => {
      if (member.displayName.length < 3) {
        await moderateNickname(member);
        await sendDiscordLog({
          action: botConfig.actions.moderateNickname,
          color: "YELLOW",
          client: this,
          notes: "User had less than two characters in their username.",
          title: "Nickname Changed",
        });
      }
    });

    this.on("interactionCreate", async (interaction) => {
      if (interaction.isCommand()) {
        const command = this.slashCommands.get(interaction.commandName);
        
        if (command == undefined) {
          botLogger.warn(
            `The requested command ${term.red(
              interaction.commandName
            )}, cannot be found withing the slashCommands Collection. The value of undefined has been returned.`
          );
          return;
        } else {
          await executeSlashCommand(command, this, interaction);
        }
      } else if (interaction.isButton()) {
        switch (interaction.customId) {
          case "pronouns":
            await interaction.deferReply({
              ephemeral: true,
            });
            new SelectRoles({ interaction: interaction }).pronounMenu();
            break;
          case "foddies":
            await interaction.deferReply({
              ephemeral: true,
            });
            new SelectRoles({ interaction: interaction }).foodiesMenu();
            break;
          case "bells":
            await interaction.deferReply({
              ephemeral: true,
            });
            new SelectRoles({ interaction: interaction }).bellMenu();
            break;
        }
      } else if (interaction.isSelectMenu()) {
        switch (interaction.customId) {
          case "pronounMenu":
            await interaction.deferReply({ ephemeral: true });
            await interaction.followUp({
              content: ":hourglass: Working...",
            });
            Object.values(botConfig.roles.pronounRoles).forEach(
              async (role) => {
                if (interaction.member.roles.cache.has(role)) {
                  await interaction.member.roles.remove(role);
                }
              }
            );
            interaction.values.forEach(async (value) => {
              await interaction.member.roles.add(value.split("_")[1]);
            });

            await interaction.editReply({
              content:
                ":ice_cream: Successfully assigned the selected pronoun roles!",
            });
            break;
          case "foodieMenu":
            await interaction.deferReply({ ephemeral: true });
            await interaction.followUp({
              content: ":hourglass: Working...",
            });
            Object.values(botConfig.roles.fooideRoles).forEach(async (role) => {
              if (interaction.member.roles.cache.has(role)) {
                await interaction.member.roles.remove(role);
              }
            });
            interaction.values.forEach(async (value) => {
              await interaction.member.roles.add(value.split("_")[1]);
            });
            await interaction.editReply({
              content:
                ":bacon: Successfully assigned the selected foodie roles!",
            });
            break;
          case "bellMenu":
            await interaction.deferReply({ ephemeral: true });
            await interaction.followUp({
              content: ":hourglass: Working...",
            });
            Object.values(botConfig.roles.bellRoles).forEach(async (role) => {
              if (interaction.member.roles.cache.has(role)) {
                await interaction.member.roles.remove(role);
              }
            });
            interaction.values.forEach(async (value) => {
              await interaction.member.roles.add(value.split("_")[1]);
            });
            await interaction.editReply({
              content: ":bell: Successfully assigned the selected bell roles!",
            });
            break;
        }
      } else if (interaction.isModalSubmit()) {
        switch (interaction.customId) {
          case "suggestion_" + interaction.user.id:
            await interaction.deferReply({ ephemeral: true });

            let title = interaction.fields.getTextInputValue("title");
            let desc = interaction.fields.getTextInputValue("desc");

            const suggestionManager = new SuggestionManager({
              interaction: interaction,
              title: title,
              desc: desc,
              client: this,
            });
            await suggestionManager.sendEmbed();
        }
      }
    });
  }
}

module.exports = BotClient;
