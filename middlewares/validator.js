const { body, param, query, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("email")
      .exists()
      .withMessage("Debe enviar un email")
      .isEmail()
      .withMessage("El email debe tener formato válido"),
    body("password")
      .exists()
      .withMessage("Debe ingresar una contraseña")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ];
};

const animesValidationRules = () => {
  return [
    body("titulo")
      .exists()
      .withMessage("Debe ingresar un titulo")
      .isLength({ min: 2 })
      .withMessage("El titulo es demasiado corto")
      .isLength({ max: 20 })
      .withMessage("El titulo es demasiado largo"),
    body("descripcion")
      .exists()
      .withMessage("Debe ingresar una descripción")
      .isLength({ max: 600 })
      .withMessage("La descripción no debe superar los 600 caracteres"),
    body("imagen").exists().withMessage("Debe ingresar una URL de la imagen"),
    body("categoria")
      .exists()
      .withMessage("Debe ingresar una categoria")
      .isAlpha()
      .withMessage("La categoria solo puede contener letras")
      .isLength({ max: 20 })
      .withMessage("La descripción no debe superar los 20 caracteres"),
  ];
};

const chaptersValidationRules = () => {
  return [
    body("titulo")
      .exists()
      .withMessage("Debe ingresar un titulo")
      .isLength({ min: 2 })
      .withMessage("El titulo es demasiado corto")
      .isLength({ max: 20 })
      .withMessage("El titulo es demasiado largo"),
    body("descripcion")
      .exists()
      .withMessage("Debe ingresar una descripción")
      .isLength({ max: 600 })
      .withMessage("La descripción no debe superar los 600 caracteres"),
    body("video").exists().withMessage("Debe ingresar una URL para ver el capítulo online."),
  ];
};

const idValidationRules = () => {
  return [
    param("id").isInt().withMessage("El ID debe ser numérico"),
    query("id").isInt().withMessage("El ID debe ser numérico"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  animesValidationRules,
  chaptersValidationRules,
  userValidationRules,
  idValidationRules,
  validate,
};
