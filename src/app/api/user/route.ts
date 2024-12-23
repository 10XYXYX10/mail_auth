import { validationForWord } from "@/lib/functions/myValidation";
import { saveAccessTokenInCookies, security } from "@/lib/functions/seculity";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try{
        //////////
        //■[ セキュリティー ]
        const {result,data,message} = await security();
        if(!result || !data)return NextResponse.json( {message}, {status:401});
        const userId = data.id;
    
        //////////
        //■[ request ]
        const requestBody = await request.json();
        const {name} = requestBody;
        if(!name)return NextResponse.json( {message:`Bad request.`}, {status:400});

        //////////
        //■[ バリデーション ]
        //name
        const validationResult = validationForWord(name,20);
        if( !validationResult.result)return NextResponse.json( {message:`Bad request.${validationResult.message}`}, {status:400});
        
        //////////
        //■[ 更新対象userの存在＆userIdの確認 ]
        const targetUser = await prisma.user.findUnique({where:{id:userId}});
        if(!targetUser || targetUser.id!==userId)return NextResponse.json( {message:'Authentication failed.'}, {status:401});

        //////////
        //■[ 更新 ]
        await prisma.user.update({
            where:{id:targetUser.id},
            data:{
                name //name:name
            }
        });
        await saveAccessTokenInCookies({id:userId,name});

        //////////
        //■[ return ]
        return NextResponse.json({message:'succes!!'},{status:200});//204,,,response返してるから今回は200番で

    }catch(err){
        const message = err instanceof Error ?  `${err.message}.` : `Internal Server Error.`;
        return NextResponse.json({ message }, {status:500});
    }
}