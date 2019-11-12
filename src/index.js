const elastic = require("./elastic");
const server = require("./server");
const data = require("./data");

(async function main() {

  const isElasticReady = await elastic.connected();

  if (isElasticReady) {
    // check if index already exists
    const indexExists = await elastic.indexExists();

    // if not - create index and add data to it
    if(!indexExists){
      await elastic.createIndex();
      await elastic.createMapping();
      await data.populateIndex();
      console.log('Init index with data');
    }
  }

  server.start();

})();
