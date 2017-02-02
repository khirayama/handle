module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'handle_database_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    migrationStorage: 'json',
    migrationStoragePath: 'sequelize-meta.json',
  },
  test: {
    username: 'root',
    password: null,
    database: 'handle_database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    migrationStorage: 'json',
    migrationStoragePath: 'sequelize-meta.json',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dialect: 'mysql',
    dialectOptions: {
      socketPath: process.env.MYSQL_SOCKETPATH,
    },
    migrationStorage: 'json',
    migrationStoragePath: 'sequelize-meta.json',
  }
}
