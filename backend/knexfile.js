require('dotenv').config();

// Update with your config settings.

module.exports = {

  development: {
    client: process.env.DB_CONNECTION,
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  },

  staging: {
    client: process.env.DB_CONNECTION,
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.DB_CONNECTION,
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD
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
