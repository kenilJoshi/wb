import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    
    if(!token){
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}
 
export const config = {
  matcher: ['/whiteBoard', "/Dashboard"],
}