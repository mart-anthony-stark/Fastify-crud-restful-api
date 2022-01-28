const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/token");

module.exports = {
  login: async (req, reply) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (!user)
        return reply.code(404).send({ msg: "User not found", success: false });

      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass)
        return reply
          .code(401)
          .send({ msg: "Invalid Password", success: false });

      const token = createToken(user);

      user._doc.password = undefined;
      reply.code(200).send({ token, user: user._doc });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error });
    }
  },

  signup: async (req, reply) => {
    try {
      const user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
      if (user) return reply.code(400).send({ err: "User already exists" });

      const newUser = new User(req.body);
      const salt = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(req.body.password, salt);

      await newUser.save();
      reply.code(200).send({ newUser });
    } catch (error) {
      console.log(error);
      reply.code(500).send({ error });
    }
  },
};
