const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Message = sequelize.define("message", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },
    message: {
        type:DataTypes.STRING,
    allowNull:false
    }
}, { timestamps: true })

module.exports =Message