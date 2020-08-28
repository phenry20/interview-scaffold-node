module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "superuser",
      password: "devpass",
      database: "postgres",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
