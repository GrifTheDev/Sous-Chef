const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Modal,
  TextInputComponent,
  MessageActionRow,
} = require("discord.js"); // eslint-disable-line no-unused-vars
const botConfig = require("../../../../bot.config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Suggestion commands.")
    .addSubcommand((command) =>
      command.setName("create").setDescription("Create a new suggestion.")
    ),

  cooldown: 10,
  deferReply: false,

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const subcmd = interaction.options.getSubcommand();

    switch (subcmd) {
      case "create":
        let suggestionTitle = new TextInputComponent()
          .setCustomId("title")
          .setLabel("Suggestion Title")
          .setRequired(true)
          .setMaxLength(500)
          .setStyle("SHORT");

        let suggestionDesc = new TextInputComponent()
          .setCustomId("desc")
          .setLabel("Suggestion Description")
          .setRequired(true)
          .setStyle("PARAGRAPH");

        let suggestionModal = new Modal()
          .setTitle("Your Suggestion")
          .setCustomId("suggestion_" + interaction.user.id)
          .addComponents(
            new MessageActionRow().addComponents(suggestionTitle),
            new MessageActionRow().addComponents(suggestionDesc)
          );
          

        await interaction.showModal(suggestionModal);
        break;
    }
  },
};
