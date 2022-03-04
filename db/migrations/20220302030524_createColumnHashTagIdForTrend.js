exports.up = function (knex) {
  return knex.schema.table("clucks", (table) => {
    table.string("hashtag");
  });
};

exports.down = function (knex) {
  return knex.schema.table("clucks", (table) => {
    table.dropColumn("hashtag"); //Drop the column of image_url
  });
};
