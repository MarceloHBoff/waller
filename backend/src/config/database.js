module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: 'postgres',
  password: 'docker',
  database: 'waller',
  define: {
    timestamps: true,
  },
};
