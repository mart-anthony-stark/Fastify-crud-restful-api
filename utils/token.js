const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const isAuth = (req, reply, next) => {
  if (!req.headers.token)
    return reply.code(401).send({ error: "Unauthenticated" });

  const token = req.headers.token.split(" ")[1];
  if (!token) return reply.code(401).send({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return reply.code(401).send({ error: "Invalid token" });

    decodedToken.user.password = undefined;
    req.user = decodedToken.user;
    next();
  });
};

module.exports = { createToken, isAuth };
