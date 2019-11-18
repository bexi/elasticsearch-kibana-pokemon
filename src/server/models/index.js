const { esclient, index, type } = require("../../elastic");

async function getPokemons(req) {
  const query = {
    query: {
      query_string: {
          query: ('*'+req.text+'*'),
          fields: [ "name", "type 1", "type 2"],
           type: "best_fields",
          //operator: "and",
          //fuzziness: "auto"

      }
    }
  }
  const { body: { hits } } = await esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: index,
    type:  type,
    body:  query
  });

  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      name:  hit._source.name,
      type_1:  hit._source['type 1'],
      type_2:  hit._source['type 2'],

    }
  });

  return {
    results,
    values
  }
}

module.exports = {
  getPokemons
}
