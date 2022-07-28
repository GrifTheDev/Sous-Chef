const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  Client,
  CommandInteraction,
} = require("discord.js"); // eslint-disable-line no-unused-vars
const user_schema = require("../../../schemas/user_schema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tests")
    .setDescription("Admin testing command.")
    .addBooleanOption((option) =>
      option.setName("hidden").setDescription("Make the reply hidden.")
    ),
  cooldown: 10,

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {

    await user_schema.create({
        _id: interaction.user.id,
        userId: interaction.user.id,
    })
    
    interaction.followUp({
      content: "Works!",
    });
  },
};
