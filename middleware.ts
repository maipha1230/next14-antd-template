import {  NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest,) {
    const token = req.cookies.get('access_token')?.value;
    const url = req.nextUrl.clone();

    if (token) {
        if (url.pathname === '/login' || url.pathname === '/register' ) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    } else if (!token){
        if (url.pathname !== '/login' && url.pathname !== '/register') {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
    return NextResponse.next()
    
}

export const config = {
    matcher: [
      '/',  // Apply middleware to protected routes
      '/login',             // Apply middleware to login page
      '/register',          // Apply middleware to register page
    ],
  };