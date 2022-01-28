const authController = require("../controllers/auth.controller");

const authRoutes = (fastify, options, done) => {
  fastify.post("/auth/login", authController.login);
  fastify.post("/auth/register", authController.signup);
  done();
};
module.exports = authRoutes;
