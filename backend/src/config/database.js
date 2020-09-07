require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: 'postgres',
  password: 'docker',
  database: 'waller',
  logging: false,
  define: {
    timestamps: true,
  },

  storage: './__tests__/database.sqlite',
};
