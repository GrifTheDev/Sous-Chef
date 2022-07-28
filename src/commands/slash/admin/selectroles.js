const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js"); // eslint-disable-line no-unused-vars

module.exports = {
  data: new SlashCommandBuilder()
    .setName("select-roles")
    .setDescription("Prints the selectroles menu.")
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

    let embedColor = "#7E6DEE"

    const pronounEmbed = new MessageEmbed()
    .setDescription("**:ice_cream: Choose some pronouns!**\n\nLet's get to know each other better! Choose some pronouns so we can reduce misgendering and provide visibility to gender-diverse people.")
    .setColor(embedColor)
    .setImage("https://cdn.discordapp.com/attachments/991076793631002684/995037461010976818/p.png")
    
    const pronounButton = new MessageButton()
    .setCustomId("pronouns")
    .setLabel("Select Pronouns")
    .setStyle("PRIMARY")

    await interaction.channel.send({
      embeds: [pronounEmbed],
      components: [new MessageActionRow().addComponents(pronounButton)]
    })

    const foodieEmbed = new MessageEmbed()
    .setDescription("**:bacon: Choose some Foodies!**\n\nWhat is your favorite food? Do you like pizza? Maybe you like salads more? Let's find out!")
    .setColor(embedColor)
    .setImage("https://cdn.discordapp.com/attachments/991076793631002684/995410023150800946/foodyroles.png")
    
    const foodieButton = new MessageButton()
    .setCustomId("foddies")
    .setLabel("Select Foodies")
    .setStyle("PRIMARY")

    await interaction.channel.send({
      embeds: [foodieEmbed],
      components: [new MessageActionRow().addComponents(foodieButton)]
    })

    const bellEmbed = new MessageEmbed()
    .setDescription("**:bell: Choose some Bells!**\n\nAren't bells just a little bit magic? If you would like to hear Discord's bell (or rather ping) when we have something to share, choose some of these roles!")
    .setColor(embedColor)
    .setImage("https://cdn.discordapp.com/attachments/991076793631002684/996138209702584370/Untitled1.png")
    
    const bellButton = new MessageButton()
    .setCustomId("bells")
    .setLabel("Select Bells")
    .setStyle("PRIMARY")

    await interaction.channel.send({
      embeds: [bellEmbed],
      components: [new MessageActionRow().addComponents(bellButton)]
    })

    interaction.followUp({
      content: ":white_check_mark: Successfully sent the select menu embeds.",
    })
  },
};
