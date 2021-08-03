// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './database/migrations'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      database: `${process.env.DATABASE_URL}?sslmode=require`
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    ssl:true
  }

};
