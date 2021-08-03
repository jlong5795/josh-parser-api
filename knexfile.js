// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
