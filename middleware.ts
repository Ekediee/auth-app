import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname

  const token = request.cookies.get('token')?.value || ''
  
  const isAuthPath = path === '/signin' || path === '/signup'

  if (isAuthPath && token){
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if (!isAuthPath && !token){
    return NextResponse.redirect(new URL('/signin', request.nextUrl))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/profile/:path*', '/signin', '/signup'
  ]
}