const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { Sequelize, Op, Model, DataTypes } = require("sequelize");

// const sequelize = new Sequelize("bd_reestr_test", "postgres", "postgres", {
//   host:'kastor.tsnigri.ru',
//   dialect: 'postgres'
// });

// const buffUser = sequelize.define('auth_user', {
// 	uniq_id :{
// 		type: DataTypes.CHAR
// 	}

// });


const userSchema = new Schema({
  name: String,
  email: {
    unique: true,
    type: String,
  },
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
