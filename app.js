const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config({});

fastify.register(require("./routes/test.route"));
fastify.register(require("./routes/auth.route"));

const PORT = process.env.PORT || 3000;
const startApp = async () => {
  try {
    await fastify.listen(PORT);
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startApp();
