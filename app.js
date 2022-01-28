const fastify = require("fastify")({ logger: true });

fastify.register(require("./routes/test.route"));
const PORT = process.env.PORT || 3000;
const startApp = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startApp();
