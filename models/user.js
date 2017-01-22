"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    provider: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Task);
        User.hasMany(models.Label);
      }
    }
  });

  return User;
};
