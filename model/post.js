const { DataTypes } = require("sequelize");
const sequelize = require('../database');

const Post = sequelize.define("post", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER
      },
});

(async () => {
  await sequelize.sync();
  
})();

module.exports = Post;
