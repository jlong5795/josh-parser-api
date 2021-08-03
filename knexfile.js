// Update with your config settings.
require('dotenv').config({ path: '../.env'})

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
    connection: `${process.env.DATABASE_URL}/?ssl=true`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    ssl: { rejectUnauthorized: false }
  }

};
