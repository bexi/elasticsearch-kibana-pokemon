const model = require("../models");

/**
 * @function getPokemons
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

 async function getPokemons(req, res) {
  const query = req.query;

  // check for missing parameters in request
  if (!query.text) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: text"
    });
    return;
  }
  try {
    const result = await model.getPokemons(req.query);
    res.json({ success: true, data: result });

  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }
 }

/**
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {void}
 */

module.exports = {
  getPokemons,
};
