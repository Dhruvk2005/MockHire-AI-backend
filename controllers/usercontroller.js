const express = require("express")
const bcyrpt = require("bcyrptjs")
const UserSignup = require('../models/signup')
const UserSignin = require("../models/signin")

const UserSignupcontroller = async (req, res) => {
    try {
        let { name, email, password } = req.body

        const existingUser = await UserSignupcontroller.findone({ email })
        if (existingUser) {
            return res.json({
                status: 400,
                mssg: "User already exists"
            })
        }


        const hashedpassword = await bcyrpt.hash(password, 10)

        const newUser = new UserSignup({ name, email, password: hashedpassword })
        await newUser.save()
        res.json({
            status: 200,
            mssg: 'User is created successfully',
            data: newUser

        })
    }
    catch (err) {
        res.json({
            status: 500,
            mssg: `user is not created ${err}`
        })
    }

}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.json({
                status: 400,
                success: false,
                message: "email and password required"
            })
        }

        const User = await UserSignin.findone({ email })
        if (!User) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const isMatch = await bcyrpt.compare(password, User.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is not matched"
            })
        }

        const token = jwt.sign({
            id: User._id,
            email: User.email
        },

            process.env.SECRET_KEY,
            {
                expiresIn: "7d"
            }
        )
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            User: {
                id: User._id,
                nae: User.name,
                password: User.password
            }
        })

    } catch (err) {
        res.json({
            status: 500,
            mssg: "Server error"
        })
    }
}

module.exports = {
    UserSignupcontroller,
    userLogin

}