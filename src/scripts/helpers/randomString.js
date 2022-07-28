const { processLogger } = require("../loggers/processLogger");

function randomId(length) {
  if (!length) return processLogger.warn("No length was specified for randomId. Failing...");
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomString = "";

  for (var i = 0; i < length; i++) {
    randomString += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return randomString;
}

module.exports = randomId;
