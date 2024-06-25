import { connect } from '@/dbConfig/dbconfig'
import User from '@/models/users'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/mailer'
var bcrypt = require('bcryptjs')

connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {username, email, first_name, last_name, password} = reqBody

        // Check if user exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({message: "User account already exists!", status: 400})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            first_name,
            last_name
        })

        const savedUser =  await newUser.save()
        console.log(savedUser)
        const maileroption = {
            email: savedUser.email, 
            emailType: "VERIFY",
            userId: savedUser._id
        }

        const mail = sendEmail(maileroption)
        // console.log(mail)

        return NextResponse.json({
            message: "User account created successfully! Check your email for account activation link.",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({message: error, status:500})
    }
}

