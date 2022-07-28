const BotClient = require("./structures/BotClient");
const { Intents } = require("discord.js");
const { verLog } = require("./scripts/helpers/versioning");
const connectDB = require("./scripts/helpers/connectDB");

(async () => {
  require("dotenv").config();

  await verLog();
  await connectDB()
  new BotClient({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    allowedMentions: {
      parse: ["users"],
      repliedUser: false,
    },
    failIfNotExists: false,
  }).login(process.env.DISCORD_TOKEN); // eslint-disable-line no-undef
})();
