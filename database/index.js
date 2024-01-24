const {Sequelize} = require('sequelize');  

const sequelize = new Sequelize('movies','root','root', {
    host: 'localhost',
    dialect : 'mysql'
});

try {
    sequelize.authenticate();
    console.log(`Connection Established Successfully`);
} catch (error)
{
    console.log(`Couldn't connect to database`);
}

module.exports = sequelize