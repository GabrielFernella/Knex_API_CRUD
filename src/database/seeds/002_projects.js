
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          user_id:5,
          title: "Meu projeto"
        }
      ]);
    });
};

//npx knex seed:make 002_projects
//npx knex seed:run
//npx knex seed:run --specific 002_projects.js