const invoiceController = require("../controllers/invoice.controller");
const { isAuth } = require("../utils/token");

const invoiceRoutes = (fastify, options, done) => {
  fastify.get(
    "/invoices",
    { preHandler: [isAuth] },
    invoiceController.getinvoices
  );
  fastify.get(
    "/invoices/:id",
    { preHandler: [isAuth] },
    invoiceController.getinvoiceById
  );
  fastify.post(
    "/invoices",
    { preHandler: [isAuth] },
    invoiceController.createinvoice
  );
  fastify.put(
    "/invoices/:id",
    { preHandler: [isAuth] },
    invoiceController.updateinvoice
  );
  fastify.delete(
    "/invoices/:id",
    { preHandler: [isAuth] },
    invoiceController.deleteinvoice
  );
  done();
};
module.exports = invoiceRoutes;
