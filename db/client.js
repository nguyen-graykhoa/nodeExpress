const knex_file = require("../knexfile");
const devConfig = knex_file["development"];

const knex = require("knex");
const connection = knex(devConfig);

module.exports = connection;
