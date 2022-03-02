exports.up = function (knex) {
  return knex.schema.table("trend", (table) => {
    table.integer("cluck_id");  
  });
};

exports.down = function (knex) {
  return knex.schema.table("trend", (table) => {
    table.dropColumn("cluck_id"); //Drop the column of image_url
  });
};
