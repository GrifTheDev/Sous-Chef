const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js"); // eslint-disable-line no-unused-vars
const botConfig = require("../../../../bot.config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("food")
    .setDescription("Look up a certain food.")
    .addStringOption((option) =>
      option
        .setName("food")
        .setDescription("The food to look up.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option.setName("hidden").setDescription("Make the reply hidden.")
    ),
  cooldown: 5,

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    let food = interaction.options.getString("food").split(" ");
    // encoding for base URL
    if (food.length > 1) {
      food = food.join("%20");
    }
    const baseURL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.NUTRITION_API_APP_ID}&app_key=${process.env.NUTRITION_API_KEY}&ingr=${food}`;

    const { data } = await axios.get(baseURL);

    if (data.parsed.length == 0)
      return interaction.followUp({
        content:
          `:warning: Your search query for ` +
          "`" +
          food +
          "`" +
          ` did not return any results.`,
      });

    const label = data.parsed[0].food.label;
    const calories = data.parsed[0].food.nutrients.ENERC_KCAL;
    const category = data.parsed[0].food.category;
    const image = data.parsed[0].food.image;
    const carbohydrates = data.parsed[0].food.nutrients.CHOCDF;
    const fat = data.parsed[0].food.nutrients.FAT;
    const protein = data.parsed[0].food.nutrients.PROCNT;
    const foodId = data.parsed[0].food.foodId;

    let embed = new MessageEmbed()
      .setTitle(label)
      .setImage(image)
      .setColor(botConfig.colors.embedColor)
      .addFields(
        {
          name: "Category",
          value: category,
          inline: true,
        },
        {
          name: "Calories",
          value: `${calories.toString()} kcal`,
          inline: true,
        },
        {
          name: "Carbohydrates",
          value: `${carbohydrates.toString()} g`,
          inline: true,
        },
        {
          name: "Fat",
          value: `${fat.toString()} g`,
          inline: true,
        },
        {
          name: "Protein",
          value: `${protein.toString()} g`,
          inline: true,
        }
      )
      .setFooter({
        text: `Food ID: ${foodId} | Powered by: developer.edamam.com`,
      });

    await interaction.followUp({
      embeds: [embed],
    });
  },
};
