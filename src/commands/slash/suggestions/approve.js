const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
const SuggestionManager = require("../../../structures/SuggestionManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("approve")
    .setDescription("Approve a suggestion.")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("ID of the suggestion you want to approve.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for approving the suggestion.")
        .setRequired(true)
    ),

  cooldown: 10,

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    let suggestionId = interaction.options.getString("id");
    let reason = interaction.options.getString("reason");

    await new SuggestionManager({
      interaction: interaction,
      client: client,
      suggestionId: suggestionId,
    }).approveSuggestion(reason);
  },
};
