import { getTokenData } from '@/helpers/getToken';
import {NextRequest, NextResponse} from 'next/server'
import {connect} from '@/dbConfig/dbconfig'
import User from '@/models/users';

connect()


export const GET = async (request:NextRequest) => {
    try {
        const tokenData = await getTokenData(request)
        
        const user = await User.findOne({_id: tokenData.id}).select('-password')
    
        return NextResponse.json({
            status: 201,
            user: user
        })
        
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({
            message: error.message,
            status: 400
        })
    }
}

