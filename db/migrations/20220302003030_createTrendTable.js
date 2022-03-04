exports.up = function (knex) {
  return knex.schema.createTable("trend", (table) => {
    table.string("hashtag");
    table.bigint("count");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("trend");
};
