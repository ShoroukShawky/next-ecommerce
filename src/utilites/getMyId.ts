'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyId() {
 
    const data = await cookies();
    const encryptToken = data.get('next-auth.session-token') || data.get('_secure-next-auth.session-token');
    
    if (!encryptToken) {
        return null; }

   
    const decoded = await decode({
        token: encryptToken.value,
        secret: process.env.NEXTAUTH_SECRET!
    });

   
    return decoded?.sub;
}
