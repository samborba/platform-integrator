// Update with your config settings.
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: `${process.env.MYSQL_DB_HOST || "127.0.0.1"}`,
      port: `${process.env.MYSQL_DB_PORT || 3306}`,
      user: `${process.env.MYSQL_DB_USER || "root"}`,
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
