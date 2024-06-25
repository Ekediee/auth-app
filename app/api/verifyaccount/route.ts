import { connect } from '@/dbConfig/dbconfig'
import User from '@/models/users'
import { NextRequest, NextResponse } from 'next/server'
import toast from 'react-hot-toast'

connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        // get user by token
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({message: "Account verification failed! Your verification token expired. Kindly contact admin for assistance.", status: 400})
        }

        // activate user
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        
        await user.save()
        toast.success('Your account verification was successful')
        
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    } catch (error: any) {
        return NextResponse.json({message: error, status:500})
    }
}

