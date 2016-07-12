
exports.up = function (knex, Promise) {
    return knex.schema.createTable('status', (table) => {
        table.increments();
        table.string('status', 10);
        table.dateTime('last_updated');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('status');
};
