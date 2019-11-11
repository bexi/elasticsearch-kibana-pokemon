const elastic = require("./elastic/");

(async function main() {

  const isElasticReady = await elastic.connected();

  if (isElasticReady) {
    // check if index already exists
    const indexExists = await elastic.indexExists();

    // if not - create index and add data to it
    if(!indexExists){
      elastic.createIndex();
      elastic.createMapping();
      elastic.populateIndex();
    }
  }

})();
