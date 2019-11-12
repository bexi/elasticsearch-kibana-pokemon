const express    = require("express");
const controller = require("../controllers");
const routes     = express.Router();

routes.route("/").get(controller.getPokemons);
routes.route("/new").post(controller.addPokemon);

module.exports = routes;
