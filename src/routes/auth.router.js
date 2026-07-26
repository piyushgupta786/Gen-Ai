const express = require("express");
const authcontrollers = require('../controllers/auth.controller')

const authRouter = express.Router();

authRouter.post('/register' , authcontrollers.UserRegister )

authRouter.post('/login' , authcontrollers.loginUser )

module.exports= authRouter;     