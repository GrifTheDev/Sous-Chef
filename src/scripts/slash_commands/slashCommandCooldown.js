
  const botConfig = require( "../../../bot.config.js");
  const { Collection, MessageEmbed } = require("discord.js")
  const cooldowns = new Map();
  
  async function slashCommandCooldown(
    commandExport,
    interaction
  ) {
  
    if (interaction.memberPermissions.has("MANAGE_MESSAGES")) return
    if (commandExport.cooldowns == undefined) return
  
    if (!cooldowns.has(commandExport.data.name)) {
      cooldowns.set(commandExport.data.name, new Collection());

    }
  
    const currentTime = Date.now();
    const timestampCollection = cooldowns.get( 
      commandExport.data.name
    ); 
    const cooldownAmount = commandExport.cooldown * 1000;
    const expirationTime =
      timestampCollection.get(interaction.user.id) || null;
  
    if (expirationTime != null) {
      /* Current timestamp is smaller then the expiration time,
      meaning the cooldown is still in effect */
      if (currentTime < expirationTime) {
        // TODO: Add smarter time parser util.
        const timeLeft = (expirationTime - currentTime) / 1000;
  
        const cooldownAlert = new MessageEmbed()
          .setDescription(
            "You can use the `" +
              commandExport.data.name +
              "` command in `" +
              timeLeft +
              "s`."
          )
          .setColor(botConfig.colors.errorColor);
  
          await interaction.followUp({
            embeds: [cooldownAlert]
          })
      }

      return true
    } else {
      timestampCollection.set(interaction.user.id, currentTime + cooldownAmount)
  
      setTimeout(() => {
        timestampCollection.delete(interaction.user.id)
      }, cooldownAmount);
    }
  }
  
module.exports = { slashCommandCooldown };
  