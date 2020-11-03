const Sequelize  = require('sequelize');

// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/awp1', {
//   logging: false 
// });

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://ania:newPassword@localhost/awp1', {
    logging: false,
    //other options to play with / add?
});

module.exports = db;