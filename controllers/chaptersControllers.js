const { Chapter, Anime } = require("../models");

const getChapters = async (req, res) => {
  if (req.query.animeId) {
    try {
      const chapters = await Chapter.findAll({
        where: { animeId: req.query.animeId },
      });

      return res.status(200).json(chapters);
    } catch (error) {
      return res.status(400).json(error);
    }
  } else {
    try {
      const chapters = await Chapter.findAll();

      return res.status(200).json(chapters);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

const getChapterbyId = async (req, res) => {
  let id = req.params.id;

  try {
    let query = await Chapter.findOne({ where: { id: req.params.id } });

    if (query) {
      return res.status(200).json(query);
    }
  } catch (err) {
    return res.status(400).json(error);
  }
  return res.status(404).json({
    message: "No existe un capítulo con el ID de su consulta. Revise los datos",
  });
};

const insertChapter = async (req, res, next) => {
  const data = {
    animeId: req.body.animeId,
    title: req.body.titulo,
    description: req.body.descripcion,
    video: req.body.video,
    createdAt: new Date(),
  };

  try {

    let query1 = await Anime.findOne({ where: { id: req.body.animeId } });
    if (!query1) {
      return res
        .status(404)
        .json({
          message: "ERROR: El animé de referencia no existe.",
        });
    }

    let query2 = await Chapter.findOne({ where: { title: req.body.titulo } });
    if (query2) {
      return res
        .status(400)
        .json({
          message: "ERROR: El capítulo ingresado ya se encuentra registrado.",
        });
    }

    const newChapter = Chapter.create(data);
    return res.status(201).json({ message: "Datos almacenados exitosamente!" });
  } catch (err) {
    res.status(400).json({ message: "Error, intentelo mas tarde" });
  }
};

const updateChapter = async (req, res) => {
  const data = {
    title: req.body.titulo,
    description: req.body.descripcion,
    image: req.body.imagen,
    category: req.body.categoria,
    updateAt: new Date(),
  };

  try {
    const updateResult = await Chapter.update(data, {
      where: { id: req.params.id },
    });

    if (updateResult[0] === 0) {
      return res
        .status(404)
        .json({ message: "No existe un capítulo con el ID de su consulta. Revise los datos" });
    } else {
      return res
        .status(201)
        .json({ message: "Los datos fueron actualizados exitosamente" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteChapter = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedChapter = await Chapter.destroy({ where: { id } });

    if (deletedChapter == 1) {
      return res
        .status(200)
        .json({ message: "El capitulo fué eliminado exitosamente" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error. Intentelo mas tarde" });
  }
  return res.status(404).json({
    message: "No existe un capítulo con el ID de su consulta. Revise los datos",
  });
};

module.exports = {
  getChapters,
  getChapterbyId,
  insertChapter,
  updateChapter,
  deleteChapter,
};
