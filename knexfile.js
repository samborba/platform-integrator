// Update with your config settings.
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: `${process.env.MYSQL_HOST || "127.0.0.1"}`,
      port: `${process.env.MYSQL_PORT || 3306}`,
      user: "root",
      database: "integrator",
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};
