"use strict";

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    provider: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        // User.hasMany(models.Task);
      }
    }
  });

  return User;
};
