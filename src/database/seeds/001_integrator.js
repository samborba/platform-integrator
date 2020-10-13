exports.seed = function (knex) {
  return knex("integrations")
    .del()
    .then(() => {
      return knex("integrations").insert([
        {
          uuid: "427c908d-9624-4721-b67b-980b6989e6ee",
          origin: "Prometheus",
          destination: "Athenas",
          experimentURL:
            "http://awsplatiagro04/seldon/deployments/59a44281-3055-4907-b890-7df7c1a328d4/api/v1.0/predictions",
        },
        {
          uuid: "a2f626c9-5e08-4eca-a5d7-5aa6baaa7982",
          origin: "Selene",
          destination: "Eros",
          status: "Stopped",
          experimentURL:
            "http://awsplatiagro02/seldon/deployments/8417e9d0-2ac9-41cb-8e1d-a5a89ef68212/api/v1.0/predictions",
        },
        {
          uuid: "d6cc6506-fe76-4b11-b7d3-e0f2124bcd12",
          origin: "Herácles",
          destination: "Belerofonte",
          status: "Failed",
          experimentURL:
            "http://awsplatiagro06/seldon/deployments/dc381760-1a69-439e-8e76-3f45d9562bac/api/v1.0/predictions",
        },
      ]);
    });
};
