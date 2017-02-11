module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'handle_database_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
    migrationStorage: 'json',
    migrationStoragePath: 'sequelize-meta.json',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'handle_database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
    migrationStorage: 'json',
    migrationStoragePath: 'sequelize-meta.json',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dialect: 'mysql',
    dialectOptions: {
      socketPath: process.env.MYSQL_SOCKETPATH,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
    migrationStorage: 'json',
    migrationStoragePath: 'sequelize-meta.json',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  },
};
