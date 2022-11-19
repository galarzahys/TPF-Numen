var express = require("express");
var router = express.Router();

const {
  getAnimes,
  getAnimebyId,
  insertAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/animesController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const {
  animesValidationRules,
  idValidationRules,
  validate,
} = require("../middlewares/validator");

router.get("/", getAnimes);

router.get("/:id", [idValidationRules()[0]], validate, getAnimebyId);

router.post("/", isAuthenticated, animesValidationRules(), validate, insertAnime);

router.put("/:id", isAuthenticated, [idValidationRules()[0]], animesValidationRules(), validate, updateAnime);

router.delete("/:id", isAuthenticated, [idValidationRules()[0]], validate, deleteAnime);

module.exports = router;
