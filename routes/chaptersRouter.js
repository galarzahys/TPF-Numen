var express = require("express");
var router = express.Router();

const {
  getChapters,
  getChapterbyId,
  insertChapter,
  updateChapter,
  deleteChapter,
} = require("../controllers/chaptersControllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const {
  chaptersValidationRules,
  idValidationRules,
  validate,
} = require("../middlewares/validator");

router.get("/", [idValidationRules()[1]], getChapters);

router.get("/:id", [idValidationRules()[0]], validate, getChapterbyId);

router.post("/", isAuthenticated, chaptersValidationRules(), validate, insertChapter);

router.put("/:id", isAuthenticated, [idValidationRules()[0]], chaptersValidationRules(), validate, updateChapter);

router.delete("/:id", isAuthenticated, [idValidationRules()[0]], validate, deleteChapter);

module.exports = router;
