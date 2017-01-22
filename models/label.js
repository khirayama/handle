"use strict";

module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define("Label", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Label.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false,
          },
        });
      }
    }
  });

  return Label;
};
