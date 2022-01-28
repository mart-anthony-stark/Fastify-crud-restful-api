const clientController = require("../controllers/client.controller");
const { isAuth } = require("../utils/token");

const clientRoutes = (fastify, options, done) => {
  fastify.get(
    "/clients",
    { preHandler: [isAuth] },
    clientController.getClients
  );
  fastify.get("/clients/:id", clientController.getClientById);
  fastify.post("/clients", clientController.createClient);
  fastify.put("/clients", clientController.updateClient);
  fastify.delete("/clients", clientController.deleteClient);
  done();
};
module.exports = clientRoutes;
