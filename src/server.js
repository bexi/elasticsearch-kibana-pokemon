                     require("dotenv").config();
const express      = require("express");
const cors         = require("cors");
const bodyParser   = require("body-parser");

const elastic      = require("./elastic");
const data         = require("./data");
const routes       = require("./server/routes");

const app  = express();
const port = process.env.NODE_PORT || 3000;

/**
 * @function start
 * @returns {void}
 * @description Starts the HTTP Express server.
 */

 (async () => {
  console.log('Try to connect to ES');
  console.log('V5');
  const isElasticReady = await elastic.checkConnection();

  if (isElasticReady) {
    const elasticIndex = await elastic.esclient.indices.exists({index: elastic.index});

    if (!elasticIndex.body) {
      await elastic.createIndex(elastic.index);
      await elastic.createMapping();
      await data.pushDataToIndex();
      console.log('Data push finished');
    }
  }

  return  app.use(cors())
             .use(bodyParser.urlencoded({ extended: false }))
             .use(bodyParser.json())
             .use("/pokemons",routes)
             .listen(port, () => console.log(`Server ready on port ${port}`));
})();
