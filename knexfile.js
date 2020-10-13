// Update with your config settings.
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: `${process.env.MYSQL_DB_HOST || "db"}`,
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
