const { createLogger, format, transports } = require("winston")
const term = require("colorette")

const logFormat = format.printf(({ level, message, stack }) => {
  return `${term.magenta("PROCESS")} ${term.yellow(">>")} [${level}]: ${stack || message}`;
});

const processLogger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/process/errors.log", level: "error" }),
    new transports.File({ filename: "logs/process/mixed.log", level: "debug" }),
    new transports.File({ filename: "logs/process/warns.log", level: "warn" }),
  ],
  exitOnError: true
});

module.exports = { processLogger };
