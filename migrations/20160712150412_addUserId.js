
exports.up = function (knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.increments();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('id');
    });
};
