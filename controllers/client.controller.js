const Client = require("../models/Client.model");
const Invoice = require("../models/Invoice.model");

const getClients = async (req, reply) => {
  try {
    const clients = await Client.find({ user_id: req.user._id });
    reply.send(clients);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const getClientById = async (req, reply) => {
  try {
    const client = await Client.findOne({
      user_id: req.user._id,
      _id: req.params.id,
    });
    reply.send({ param: req.params.id, client });
  } catch (error) {
    reply.code(500).send(error);
  }
};

const createClient = async (req, reply) => {
  try {
    const { name, email, street_addreplys, city, zip_code, country } = req.body;
    const client = await new Client({
      user_id: req.user._id,
      name,
      email,
      street_addreplys,
      city,
      zip_code,
      country,
    }).save();
    reply.send(client);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const updateClient = async (req, reply) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    reply.code(200).send(updatedClient);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const deleteClient = async (req, reply) => {
  try {
    Client.findOneAndRemove({ _id: req.params.id, user_id: req.user._id }).then(
      (removedDoc) => {
        reply.code(200).send(removedDoc);

        deleteInvoicesFromClient(removedDoc._id);
      }
    );
  } catch (error) {
    reply.code(500).send(error);
  }
};

// Helper
let deleteInvoicesFromClient = (client_id) => {
  Invoice.deleteMany({ client_id })
    .then(() => {
      console.log(`Invoices deleted from client`);
    })
    .catch((e) => console.log(e));
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
