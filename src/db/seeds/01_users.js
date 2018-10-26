
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tusers').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, name: 'Ana', email: 'ana@mail.com'},
        {id: 2, name: 'Barbi', email: 'barbi@mail.com'},
        {id: 3, name: 'Nico', email: 'nico@mail.com'}
      ]);
    });
};
