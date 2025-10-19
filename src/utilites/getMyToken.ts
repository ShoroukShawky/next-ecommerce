'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken()
{
        const data = await cookies()
        const enctyptToken = data.get('next-auth.session-token') || data.get('__Secure-next-auth.session-token')
       
        if(!enctyptToken)
        {
          return null
        }
       
        const token  = await decode({token: enctyptToken?.value,secret: process.env.NEXTAUTH_SECRET!
})

           return token?.token
    }
