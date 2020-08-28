exports.seed = (knex, Promise) =>
  knex("organizations").insert([
    { name: "Foo Corp" },
    { name: "Test Corp" },
    { name: "Funny Corp" },
  ]);
