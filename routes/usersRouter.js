var express = require("express");
var router = express.Router();

const {
  getUsers,
  insertUserFavorites,
  deleteUserFavorite,
  getUserbyId,
  deleteUser,
} = require("../controllers/usersController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const { idValidationRules, validate } = require("../middlewares/validator");

router.get("/", getUsers);

router.get("/:id", [idValidationRules()[0]], validate, getUserbyId);

router.post(
  "/favorites/:id",
  isAuthenticated,
  [idValidationRules()[0]],
  validate,
  insertUserFavorites
);

router.delete(
  "/favorites/:id",
  isAuthenticated,
  [idValidationRules()[0]],
  validate,
  deleteUserFavorite
);

router.delete("/:id", isAuthenticated, [idValidationRules()[0]], validate, deleteUser);

module.exports = router;
