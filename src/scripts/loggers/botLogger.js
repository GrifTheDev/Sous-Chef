const { createLogger, format, transports } = require("winston")
const term = require("colorette")

const logFormat = format.printf(({ level, message, stack }) => {
  return `${term.cyan("BOT")} ${term.yellow(">>")} [${level}]: ${stack || message}`;
});

const botLogger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/bot/errors.log", level: "error" }),
    new transports.File({ filename: "logs/bot/mixed.log", level: "debug" }),
    new transports.File({ filename: "logs/bot/warns.log", level: "warn" }),
  ],
  exitOnError: true
});

module.exports = { botLogger };
