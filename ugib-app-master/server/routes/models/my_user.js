console.log(22222)

const { Op, Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const {UdsMeta} = require("./uds");


class My_user extends Model {}
class UserInfo extends Model {}
class Bascet extends Model {}
class Bascet_udsMeta extends Model {}

My_user.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    is_superuser:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    username:{
        type: DataTypes.STRING(150),
    },
    first_name:{
        type: DataTypes.STRING(150)
    },
    last_name:{
        type: DataTypes.STRING(150)
    },
    email: {
        type: DataTypes.STRING(254),
        allowNull: true,
    },
    is_staff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password:{
        type: DataTypes.STRING(128),
    },
    date_joined:{
        type: DataTypes.DATE,
        defaultValue:Date.now(),
    }
    }, 
    {tableName: 'auth_user',
        sequelize,
        timestamps: false
});

UserInfo.init({
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
    },
    departament:{
        type: DataTypes.STRING(200),
    },
    position: {
        type: DataTypes.STRING(200)
    },

}, {
        tableName: 'user_info',
        sequelize,
        timestamps: false
});



Bascet.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
} ,{
        tableName: 'bascet',
        sequelize,
        timestamps: false
});

// Bascet_udsMeta.init({
//     id:{
//         type: DataTypes.INTEGER,
//         autoIncrement:true,
//         primaryKey: true,
//     },
// });

My_user.hasOne(UserInfo, {foreignKey: 'user_id', onDelete: 'CASCADE'});



User_Bascet = My_user.hasOne(Bascet,  {
    foreignKey: 'my_user_id'
  });



Bascet.Uds = Bascet.hasMany(UdsMeta,{foreignKey:"bascet_id"});


module.exports = {My_user, UserInfo, Bascet};
