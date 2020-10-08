exports.seed = function (knex) {
  return knex("integrations")
    .del()
    .then(() => {
      return knex("integrations").insert([
        {
          uuid: "427c908d-9624-4721-b67b-980b6989e6ee",
          origin: "Prometheus",
          destination: "Athenas",
          experimentUrl: "awsplatiagro04",
        },
        {
          uuid: "a2f626c9-5e08-4eca-a5d7-5aa6baaa7982",
          origin: "Selene",
          destination: "Eros",
          status: "Stopped",
          experimentUrl: "awsplatiagro02",
        },
        {
          uuid: "d6cc6506-fe76-4b11-b7d3-e0f2124bcd12",
          origin: "Herácles",
          destination: "Belerofonte",
          status: "Failed",
          experimentUrl: "awsplatiagro06",
        },
      ]);
    });
};
