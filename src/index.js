const elastic = require("./elastic/");

(async function main() {

  const isElasticReady = await elastic.connected();

  if (isElasticReady) {
    // check if index already exists
    const elasticIndex = null;

    // if not - create index and add data to it
    if(!elasticIndex){
      // create index
      // create mapping
      // populate the index
    }

  }

})();
