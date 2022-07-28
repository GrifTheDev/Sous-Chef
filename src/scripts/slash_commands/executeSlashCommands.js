const { botLogger } = require("../loggers/botLogger");
const term = require("colorette");
const { slashCommandCooldown } = require("./slashCommandCooldown");

async function executeSlashCommand(commandExport, client, interaction) {
  const hidden =
    interaction.options.getBoolean("hidden") == null
      ? true
      : interaction.options.getBoolean("hidden"); // assume the command response will be hidden unless told otherwise

  const deffer = commandExport.deferReply == undefined ? true : commandExport.deferReply;

  try {
    if (deffer == true) {
      await interaction.deferReply({ ephemeral: hidden });
    }
    
  } catch (error) {
    botLogger.warn(
      `There was an error while trying to defer the reply to the ${term.red(
        commandExport.data.name
      )} command. Full stack:\n\n${error}` 
    );
  }

  var isCooldown = await slashCommandCooldown(commandExport, interaction);

  try {
    if (isCooldown != true) {
      await commandExport.execute(interaction, client);
    }
  } catch (error) {
    botLogger.warn(
      `There was an error while executing the ${term.red(
        commandExport.data.name
      )} command. Full stack:\n\n${error}`
    );

    await interaction.followUp({
      content:
        ":x: Whoops! Something went wrong on my end. Please try again or contact the developers.",
    });
  }
}

module.exports = { executeSlashCommand };
