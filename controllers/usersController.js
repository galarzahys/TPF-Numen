const { User, Anime, Favorite } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getUserbyId = async (req, res) => {
  let id = req.params.id;

  try {
    let query = await User.findOne({ where: { id: req.params.id } });

    if (query) {
      let favorites = await getUserFavorites(id);
      console.log(favorites);

      if (favorites.length > 0) {
        let response = {
          ...query.dataValues,
          Favorites: favorites,
        };
        return res.status(200).json(response);
      }
      let response = {
        ...query.dataValues,
        Favorites:
          "La lista de favoritos se encuentra vacia. Inserte un animé favorito.",
      };

      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(404).json({
    message: "No existe un usuario con el ID de su consulta. Revise los datos",
  });
};

const insertUserFavorites = async (req, res) => {
  const data = {
    userId: req.params.id,
    animeId: req.body.animeId,
    createdAt: new Date(),
  };

  try {
    let query1 = await User.findOne({ where: { id: req.params.id } });
    if (!query1) {
      return res.status(404).json({
        message:
          "No existe un usuario con el ID de su consulta. Revise los datos",
      });
    }

    let query2 = await Favorite.findOne({
      where: { animeId: req.body.animeId, userId: req.params.id },
    });
    if (query2) {
      return res
        .status(400)
        .json({
          message:
            "ERROR: El anime ingresado ya se encuentra en el listado de favoritos",
        });
    }

    let query3 = await Anime.findOne({ where: { id: req.body.animeId } });
    if (!query3) {
      return res
        .status(404)
        .json({
          message: "ERROR: El anime ingresado no existe. Revise los datos",
        });
    }

    let query = await Favorite.create(data);

    if (query) {
      return res.status(201).json({
        message: "Los datos fueron almacenados exitosamente",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getUserFavorites = async (id) => {
  const arrayF = [];

  try {
    let favorites = await Favorite.findAll({
      where: { userId: id },
    });

    if (favorites) {
      console.log(favorites);
      for (let i = 0; i < favorites.length; i++) {
        let anime = await Anime.findAll({
          where: { id: favorites[i].dataValues.animeId },
        });
        if (anime) {
          let favData = {
            id: anime[0]?.dataValues.id,
            titulo: anime[0]?.dataValues.title,
          };
          arrayF.push(favData);
        }
      }

      if (arrayF.length > 0) {
        return arrayF;
      } else {
        return "La lista de favoritos se encuentra vacia. Inserte un animé favorito.";
      }
    }
  } catch (err) {
    return err;
  }
};

const deleteUserFavorite = async (req, res) => {
  try {
    let query1 = await User.findOne({ where: { id: req.params.id } });
    if (!query1) {
      return res.status(404).json({
        message:
          "No existe un usuario con el ID de su consulta. Revise los datos",
      });
    }

    let query2 = await Anime.findOne({ where: { id: req.body.animeId } });
    if (!query2) {
      return res
        .status(404)
        .json({
          message: "ERROR: El anime ingresado no existe. Revise los datos",
        });
    }
    await Favorite.destroy({ where: { animeId: req.body.animeId } });

    return res
    .status(200)
    .json({ message: `El animé id: ${req.body.animeId} fue eliminado de favoritos` });

  } catch (err) {
    return res.status(400).json({ message: "Error. Intentelo mas tarde" });
  }

}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.destroy({ where: { id } });

    if (deletedUser == 1) {
      await Favorite.destroy({ where: { userId: id } });

      return res
        .status(200)
        .json({ message: "El usuario fué eliminado exitosamente" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error. Intentelo mas tarde" });
  }
  return res.status(404).json({
    message: "No existe un usuario con el ID de su consulta. Revise los datos",
  });
};

module.exports = {
  getUsers,
  getUserbyId,
  insertUserFavorites,
  deleteUserFavorite,
  deleteUser,
};
