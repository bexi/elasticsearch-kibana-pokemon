const express      = require("express");
const cors         = require("cors");
const bodyParser   = require("body-parser");
const routes       = require("./routes");

const app  = express();
const port = 3000;

/**
 * @function start
 * @returns {void}
 * @description Starts the api server.
 */
function start() {
  return  app.use(cors())
             .use(bodyParser.urlencoded({ extended: false }))
             .use(bodyParser.json())
             .use("/pokemons",routes)
             .listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
  start
};
