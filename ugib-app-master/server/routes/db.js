const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("bd_reestr_test", "postgres", "postgres", {
  host:'kastor.tsnigri.ru',
  dialect: 'postgres',
  logging:true
});

try {
  sequelize.authenticate();
  sequelize.sync();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


module.exports = sequelize;