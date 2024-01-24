const { DataTypes } = require("sequelize");
const sequelize = require('../database');

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
});

(async () => {
  await sequelize.sync();
  
})();

module.exports = User;
