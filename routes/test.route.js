const testRoutes = (fastify, options, done) => {
  fastify.get("/", (req, reply) => {
    reply.send("Hello");
  });
  done();
};
module.exports = testRoutes;
