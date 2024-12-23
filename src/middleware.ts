import { NextRequest, NextResponse } from 'next/server';
import { security } from './lib/functions/seculity';
import { AuthUser } from './lib/types';

export const middleware = async(request: NextRequest) => {
  const responseNext = NextResponse.next()

  const jwtEncoded = request.cookies.get('accessToken')?.value;
  let result = false;
  let data:AuthUser|null = null;
  if(jwtEncoded){
    const seculityResult = await security(jwtEncoded);
    result = seculityResult.result;
    data = seculityResult.data;
  }

  const pathName = request.nextUrl.pathname;
  const userId = Number(pathName.split('/')[2]);//「/user/<認証済みuserId>」

  if(!result || userId!=data?.id){
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth';
    const response = NextResponse.redirect(redirectUrl)
    if(request.cookies.has('accessToken')){
      response.cookies.delete('accessToken')//middlewareを経由してredirectする場合、responseからcookieを削除しないと、削除に失敗する。
    }
    return response;
  }

  return responseNext;
};

export const config = {
  matcher: ['/user/:path*'],
};
