const { Client } = require("@elastic/elasticsearch");

const elasticUrl = "http://localhost:9200";
const esClient   = new Client({ node: elasticUrl });
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
      } catch (e) {
        console.log("Failed to connect to ElasticSearch. Error: ", e);
      }
    }

    resolve(true);

  });
}

/**
 * @function indexExists
 * @returns {Promise<Boolean>}
 * @description
 */
function indexExists() {
  return new Promise(async (resolve) => {
    try {
      const response = await esClient.indices.exists({index: index});
      console.log('Does index exists? ', response.body);
      resolve(response.body);
    }catch (e) {
      console.log('Error when creating an index. Error: ', e);
      resolve(false);
    }
  });
}

/**
 * @function createIndex
 * @returns {Promise<Boolean>}
 * @description
 */
async function createIndex(){
  try {
    await esClient.indices.create({index: index});
    console.log('Created index');
  }catch(e){
    console.log('Failed to create index. Error: ', e);
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

    await esClient.indices.putMapping({
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

module.exports = {
  esClient,
  connected,
  indexExists,
  createIndex,
  createMapping,
  index,
  type,
}
