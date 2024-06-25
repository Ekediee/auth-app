import { NextRequest } from 'next/server';
let jwt = require('jsonwebtoken')

export const getTokenData = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        return decodedToken
    } catch (error: any) {
        throw new Error(error.message);
    }
}
