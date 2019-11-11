const { Client } = require("elasticsearch");
const elasticUrl = "http://localhost:9200";
const esClient   = new Client({ node: elasticUrl, maxRetries: 5});
const index      = "pokemons";
const type       = "pokemons";

/**
 * @function connected
 * @returns {Promise<Boolean>}
 * @description
 */

function connected() {
  return new Promise(async (resolve) => {

    let connected = false;

    while (!connected) {
      try {
        await esClient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        connected = true;
      } catch (_) {}
    }

    resolve(true);

  });
}

module.exports = {
  connected
}
