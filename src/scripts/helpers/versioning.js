const packageJson = require("../../../package.json");
const term = require("colorette")
const { processLogger } = require("../loggers/processLogger.js");

async function checkVersion() {
  const nodeMajor = process.versions.node.split(".")[0]; // eslint-disable-line no-undef

  if (Number(nodeMajor) < 16) {
    processLogger.error(`NodeJS 16 or newer is required to run Spark.`);
    process.exit(1) // eslint-disable-line no-undef
  }
}

async function verLog() {
  console.clear();
  await checkVersion();
  const packageVersion = packageJson.version;
  console.log(
    "─────────────────────────────────────────────────────────────────────"
  );
  processLogger.info(
    `Starting ${term.cyan(
      "Sous-chef v" + packageVersion
    )} on ${term.green("NodeJS v" + process.versions.node)}...` // eslint-disable-line no-undef
  );
  console.log(
    "─────────────────────────────────────────────────────────────────────"
  );
}

module.exports = { verLog };
