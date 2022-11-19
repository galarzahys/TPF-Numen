const { json } = require("sequelize");
const { Anime, Chapter, Favorite } = require("../models");

const getAnimes = async (req, res) => {
  try {
    const animes = await Anime.findAll();

    return res.status(200).json(animes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAnimebyId = async (req, res) => {
  let id = req.params.id;

  try {
    let query = await Anime.findOne({ where: { id: req.params.id } });

    if (query) {
      let chapters = await getAnimeChapters(id);

      let response = {
        ...query.dataValues,
        Chapters: chapters.conditions,
      };

      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(400).json(error);
  }
  return res.status(404).json({
    message: "No existe un anime con el ID de su consulta. Revise los datos",
  });
};

const getAnimeChapters = async (id) => {
  try {
    const chapters = await Chapter.findAll({
      where: { animeId: id },
    });

    return json(chapters);
  } catch (error) {
    return error;
  }
};

const insertAnime = async (req, res, next) => {
  const data = {
    title: req.body.titulo,
    description: req.body.descripcion,
    image: req.body.imagen,
    category: req.body.categoria,
    createdAt: new Date(),
  };

  try {
    let query = await Anime.findOne({ where: { title: req.body.titulo } });
    if (query) {
      return res
        .status(400)
        .json({
          message: "ERROR: El anime ingresado ya se encuentra registrado.",
        });
    }

    const newAnime = Anime.create(data);
    return res.status(201).json({ message: "Datos almacenados exitosamente!" });
  } catch (err) {
    res.status(400).json({ message: "Error, intentelo mas tarde" });
  }
};

const updateAnime = async (req, res) => {
  const data = {
    title: req.body.titulo,
    description: req.body.descripcion,
    image: req.body.imagen,
    category: req.body.categoria,
    updateAt: new Date(),
  };

  try {
    const updateResult = await Anime.update(data, {
      where: { id: req.params.id },
    });

    if (updateResult[0] === 0) {
      return res
        .status(404)
        .json({ message: "No existe un anime con este id" });
    } else {
      return res
        .status(201)
        .json({ message: "Los datos fueron actualizados exitosamente" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteAnime = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnime = await Anime.destroy({ where: { id } });

    if (deletedAnime == 1) {
      await Favorite.destroy({ where: { animeId: id } });
      await Chapter.destroy({ where: { animeId: id } });

      return res
        .status(200)
        .json({ message: "El animé fué eliminado exitosamente" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error. Intentelo mas tarde" });
  }
  return res.status(404).json({
    message: "No existe un anime con el ID de su consulta. Revise los datos",
  });
};

module.exports = {
  getAnimes,
  getAnimebyId,
  insertAnime,
  updateAnime,
  deleteAnime,
};
