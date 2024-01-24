const { DataTypes } = require("sequelize");
const sequelize = require('../database');

const Session = sequelize.define("session", {
    userId  : { 
        type: DataTypes.INTEGER, 
        allowNull: false
    },  
    jwt: {
       type: DataTypes.TEXT('long'),
       allowNull: false
    },
    status: {
       type: DataTypes.STRING,
       allowNull: false,
    }
});

(async () => {
  await sequelize.sync();
  
})();

module.exports = Session;
