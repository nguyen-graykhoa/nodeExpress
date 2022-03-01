const faker = require("faker");

exports.seed = function (knex) {
  return (
    knex("clucks")     
      .del()
      .then(function () {
        const clucks = Array.from({ length: 100 }).map(() => {
          return {
            username: faker.name.findName(),
            content: faker.lorem.paragraph(),
            image_url: faker.image.imageUrl(),
            created_at: faker.date.past(),
          };
        });                
        return knex("clucks").insert(clucks);
      })
  );
};
