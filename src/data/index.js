// data
const pokemons  = require(`./pokemons.json`);
const elastic = require("../elastic");

/**
 * @function createESAction
 * @returns {{index: { _index: string, _type: string }}}
 * @description Returns an ElasticSearch Action in order to
 *              correctly index documents.
 */
const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type
  }
};

/**
 * @function pupulateIndex
 * @returns {void}
 */
async function pushDataToIndex() {

  const docs = [];

  for (const pokemon of pokemons) {
    docs.push(esAction);
    docs.push(pokemon);
  }

  return elastic.esclient.bulk({ body: docs });
}

module.exports = {
  pushDataToIndex
}
