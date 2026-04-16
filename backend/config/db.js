const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('group_chat_app', "root", "root123", {
    host: "localhost",
    dialect: "mysql",
})

    ; ( async () => {
        try {
            await sequelize.authenticate()
            console.log("db Ok")
        } catch (error) {
            console.log("Db error",error)
        }
})()

module.exports = sequelize