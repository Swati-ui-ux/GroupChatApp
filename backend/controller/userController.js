
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const postUser = async(req,res) => {
  try {
      const { name, email, password, phone } = req.body;
      const hashPassword = await bcrypt.hash(password,10)
      const user = await User.create({ name, email, phone, password:hashPassword })
      if (!user) {
          return res.status(404).json({message:"User not created"})
      }
      res.status(201).json({message:"User created successful",user})
  } catch (error) {
      console.log(error)
     res.status(500).json({message:"server error",})
  }
}

const loginUser = async(req,res) => {
try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    console.log("Uset",user)
    if (!user) {
    return res.status(404).json({message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
     return res.status(404).json({message:"Invalid password"})
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY,
        { expiresIn:'7d'}
    )
    res.status(200).json({message:"User login success",token})
} catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
}
}

module.exports={postUser,loginUser}
