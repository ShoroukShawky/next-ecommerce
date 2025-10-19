
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {jwtDecode} from 'jwt-decode'
export const authOptions:NextAuthOptions = {

  pages:{
    signIn:'/login'

  },
  providers:
  
    [  Credentials({
         name:'credentials',
         credentials:
         {
            email:{},
            password:{}
         },
         authorize:async(cre)=>
         {
              const res = await fetch(`${process.env.API}/auth/signin`,{
                method:"POST",
                body:JSON.stringify(
                    {
                        email:cre?.email,
                        password:cre?.password
                    }
                ),
                headers:{
                    'Content-Type':'application/json'
                }
              })
              const payload = await res.json()
              console.log(payload)
              
              if(payload.message == 'success')
             {
             const decodedToken:{id:string}= jwtDecode(payload.token)
              const decode = JSON.parse(Buffer.from(payload.token.split('.')[1],'base64').toString());
               return{
                id: decodedToken.id,
                 user:payload.user ,
                 token:payload.token
               } 


             }
             else
              throw new Error(payload.message|| 'Somthing went wrong')
         }
      })
    ],
    callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = user.user;   
      token.token = user.token; 
    
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user = token.user;
      session.token = token.token;
     
    }
    return session;
  },
}

  
}