const userModel = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function UserRegister ( req ,res) {
    const { username , email , password } =  req.body;

    if (!username || !email || !password ){
        return res.status(400).json({
            message: " Please provide your valid username, email and password "
        })
    }

    const isUserAlreadyExists = await usermodel.findOne({
        $or : [{username},{email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User is already Exist with this email or username"
        })
    }

    const hash = await bcrypt.hash(password , 10)

    const newUser = new userModel.create({
        username,
        email,
        password: hash 
    })

    const token = jwt.sign( 
        {id:user._id , username: user.username}
        ,process.env.JWT_SECRET_KEY,
        { expiresIN : "1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message : " User registered succesfully",
        USER:{
            id : user._id,
            username:user.username,
            email:user.email,
        }
    })
}


 async function loginUser(req,res){

    const { email , password } = req.body

    const user = await userModel.findOne({ email })

    if()
 }

module.exports = {UserRegister}