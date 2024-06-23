import { connect } from '@/dbConfig/dbconfig'
import User from '@/models/users'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
var bcrypt = require('bcryptjs')

connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        // Check if user exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message: "User account does not exists!", status: 400})
        }

        // validate email and password
        const valPass = await bcrypt.compare(password, user.password)
        
        if(!valPass || email !== user.email){
            return NextResponse.json({message: "Invalid email or password! Crosscheck and try again", status: 400})
        }

        // generate user token
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const userToken = await jwt.sign(userData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })
        
        response.cookies.set("token", userToken, {
            httpOnly: true
        })

        return response
    } catch (error: any) {
        return NextResponse.json({message: error, status:500})
    }
}

