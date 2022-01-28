const clientController = require("../controllers/client.controller");
const { isAuth } = require("../utils/token");

const clientRoutes = (fastify, options, done) => {
  fastify.get(
    "/clients",
    { preHandler: [isAuth] },
    clientController.getClients
  );
  fastify.get(
    "/clients/:id",
    { preHandler: [isAuth] },
    clientController.getClientById
  );
  fastify.post(
    "/clients",
    { preHandler: [isAuth] },
    clientController.createClient
  );
  fastify.put(
    "/clients/:id",
    { preHandler: [isAuth] },
    clientController.updateClient
  );
  fastify.delete(
    "/clients/:id",
    { preHandler: [isAuth] },
    clientController.deleteClient
  );
  done();
};
module.exports = clientRoutes;
