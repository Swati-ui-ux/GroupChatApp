const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define("users",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
       
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
}, { timestepms: true })

module.exports= User