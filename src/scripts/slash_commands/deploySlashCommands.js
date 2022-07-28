const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { botLogger } = require("../loggers/botLogger");

async function deploySlashCommands(commands) {
  const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN); // eslint-disable-line no-undef

  try {
    botLogger.info("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.clientId, // eslint-disable-line no-undef
        process.env.guildId // eslint-disable-line no-undef
      ),
      {
        body: commands,
      }
    );

    botLogger.info("Successfully reloaded application (/) commands.");
  } catch (error) {
    botLogger.error(error);

    process.exit(1) // eslint-disable-line no-undef
  }
}

module.exports = { deploySlashCommands };
