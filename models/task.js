"use strict";

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Task.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false,
          },
        });
      }
    }
  });

  return Task;
};
