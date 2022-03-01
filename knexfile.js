module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "quiz01",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations",
    },
  },
};
