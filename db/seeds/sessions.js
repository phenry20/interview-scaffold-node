exports.seed = (knex, Promise) =>
  knex("sessions").insert([
    { organization_id: 1 },
    { organization_id: 1 },
    { organization_id: 2 },
  ]);
