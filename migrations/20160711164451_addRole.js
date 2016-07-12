exports.up = function (knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.string('role', 15);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('role');
    });
};
