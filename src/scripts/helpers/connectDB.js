const { processLogger } = require("../loggers/processLogger");
const mongoose = require("mongoose");

async function connectDB() {
  let startTime = Date.now();
  processLogger.info("Attempting to connect to the MongoDB database...");

  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_SRV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    processLogger.info(`Successfully connected to the MongoDB database in ${((Date.now() - startTime) / 1000).toFixed(2)} seconds.`);
  } catch (error) {
    processLogger.error(`There was an error while trying to connect to the MongoDB database.\n\n${error}`);
  
    process.exit(1)
}
}

module.exports = connectDB;
