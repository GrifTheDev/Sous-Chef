const fs = require("fs");
const path = require("path");
const { botLogger } = require("../loggers/botLogger");
const { deploySlashCommands } = require("./deploySlashCommands");

async function cacheSlashCommands(client) {
  const commands = [];

  const directories = fs.readdirSync(
    path.resolve(__dirname, "../../commands/slash") // eslint-disable-line no-undef
  );

  for (let directory of directories) {
    const filesOfDirectory = fs.readdirSync(
      path.resolve(__dirname, `../../commands/slash/${directory}`) // eslint-disable-line no-undef
    );

    for (let file of filesOfDirectory) {
      const command = require(path.resolve(
        __dirname, // eslint-disable-line no-undef
        `../../commands/slash/${directory}/${file}`
      ));

      client.slashCommands.set(command.data.name, command);

      commands.push(command.data.toJSON());
    }
  }

  botLogger.info(
    `Cached ${client.slashCommands.size} slash commands, calling deployment.`
  );

  await deploySlashCommands(commands);
}

module.exports = { cacheSlashCommands };
