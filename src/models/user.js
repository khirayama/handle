module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
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
  });
};
