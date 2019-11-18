const { Client } = require("@elastic/elasticsearch");
                   require("dotenv").config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient   = new Client({ node: elasticUrl });
const index      = "pokemons";
const type       = "pokemons";

/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */

async function createIndex(index) {
  try {

    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);

  } catch (err) {

    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);

  }
}


/**
 * @function createMapping,
 * @returns {void}
 * @description Mapping is the process of defining how a document,
 * and the fields it contains, are stored and indexed.
 */
async function createMapping () {
  try {
    const schema = {
      // name of pokemon
      name: {
        type: "text"
      }
    };

    await esclient.indices.putMapping({
      index,
      type,
      include_type_name: true,
      body: {
        properties: schema
      }
    })
    console.log("Pokemon mapping created successfully");
  } catch (e) {
    console.error("An error occurred while setting the quotes mapping. Error: ", e);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */

function checkConnection() {
  return new Promise(async (resolve) => {

    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;

    while (!isConnected) {
      try {

        await esclient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;

      // eslint-disable-next-line no-empty
      } catch (_) {

      }
    }

    resolve(true);

  });
}

module.exports = {
  esclient,
  createMapping,
  checkConnection,
  createIndex,
  index,
  type
};
