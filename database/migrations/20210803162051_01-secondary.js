
exports.up = function(knex) {
    return knex.schema.createTable('cleaned', juices => {
        juices.increments('item_id');
        juices.text('brand');
        juices.text('flavor');
        juices.text('size');
        juices.text('nicotine');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cleaned');
  };