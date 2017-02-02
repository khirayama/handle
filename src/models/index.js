const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require('config/config.js')[env];

const db = {};
let sequelize = null;

if (config.use_env_variable) {
  if (process.env.CLEARDB_DATABASE_URL) {
    const dbUrl = process.env.CLEARDB_DATABASE_URL;
    const dbHost = dbUrl.match(/@([0-9,A-Z,a-z][0-9,a-z,A-Z,_,.,-]+\.net)/)[1];
    sequelize = new Sequelize(dbUrl, {
      dialect: 'mysql',
      protocol: 'mysql',
      host: dbHost,
      logging: true,
    });
  }
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
