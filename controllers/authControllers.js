const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  try {
    // Obtiene los datos del usuario
    const { email, password } = req.body;

    let query = await User.findOne({ where: { email: req.body.email } });
    if (query) {
      return res
        .status(400)
        .json({ message: "El email ingresado ya se encuentra registrado." });
    }
    // Hasheo de password
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      // Crea el usuario en la base de datos
      const user = await User.create({
        email,
        password: hashedPassword,
      });
      if (user) {
        return res
          .status(201)
          .json({
            message: `Registro exitoso! Bienvenido ${email.split("@")[0]}!`,
          });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica si el email existe
    const users = await User.findOne({ where: { email } });

    if (!users) {
      return res
        .status(404)
        .json({ message: "El email ingresado no se encuentra registrado." });
    }

    // Verifica si el password ingresado es correcto
    const equal = bcrypt.compareSync(password, users.password);

    if (!equal) {
      return res
        .status(401)
        .json({ message: "La contraseña ingresada es inválida" });
    } else {
      jwt.sign(
        { user: users.email },
        process.env.SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          return res.status(200).json({
            subject: users,
            token: token,
            message: `Ingreso exitoso! Bienvenido ${email.split("@")[0]}!`,
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};
