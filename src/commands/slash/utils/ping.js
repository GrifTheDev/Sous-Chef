const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js"); // eslint-disable-line no-unused-vars

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot ping.")
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

    var msgEditStart = Date.now();

    await interaction.followUp({
      content: `:hourglass: Retrieving Message Edit time...`,
    });

    var msgEditEnd = Date.now();
    var msgEditTime = msgEditEnd - msgEditStart;

    await interaction.editReply({
      content: `:hourglass: Retrieving Client Websocket ping...`,
    });

    var clientPing = client.ws.ping;

    await interaction.editReply({
      content: `:sushi: The client websocket ping is **${clientPing} ms** and the message edit time is **${msgEditTime} ms**.`,
    });
  },
};
