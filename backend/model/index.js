const Message = require("./message")
const User = require("./user")

User.hasMany(Message)
Message.belongsTo(User)

module.exports = {
User,Message,
}