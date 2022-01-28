const Invoice = require("../model/Invoice");

const getInvoices = async (req, reply) => {
  try {
    const invoices = req.query.client
      ? await Invoice.find({
          user_id: req.user._id,
          client_id: req.query.client,
        })
      : await Invoice.find({ user_id: req.user._id });
    reply.send(invoices);
  } catch (error) {
    console.log(error);
    reply.code(500).send(error);
  }
};

const getInvoiceById = async (req, reply) => {
  try {
    const invoice = await Invoice.findOne({
      user_id: req.user._id,
      _id: req.params.id,
    });
    reply.send({ param: req.params.id, invoice });
  } catch (error) {
    reply.code(500).send(error);
  }
};

const createInvoice = async (req, reply) => {
  try {
    const {
      client_id,
      code,
      start_date,
      due,
      payment_terms,
      product_desc,
      items,
    } = req.body;
    const invoice = await new Invoice({
      user_id: req.user._id,
      client_id,
      code,
      start_date,
      due,
      payment_terms,
      product_desc,
      items,
    }).save();
    reply.send(invoice);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const updateInvoice = async (req, reply) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    reply.code(200).send(updatedInvoice);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const deleteInvoice = async (req, reply) => {
  try {
    await Invoice.findOneAndDelete({ _id: req.params.id });
    reply.code(200).send({ success: true });
  } catch (error) {
    reply.code(500).send(error);
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
