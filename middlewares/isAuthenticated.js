const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  }
  if (!authHeader) {
    return res.status(403).json({ message: "Token no encontrado!" });
  }
};

module.exports = { isAuthenticated };
