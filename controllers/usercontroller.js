const express = require("express")
const bcyrpt = require("bcyrptjs")
const UserSignup = require('../models/signup')

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

        const newUser = new UserSignup({ naem, email, password: hashedpassword })
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