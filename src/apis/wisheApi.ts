import getMyToken from "@/utilites/getMyToken"

export async function addToWishList(id:string)
{
    const token = await getMyToken()
const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        method:'POST' ,
        body:JSON.stringify({
            productId:id
        }),
        headers:{
           token:`${token}`,
            "Content-Type":"application/json"
        }
    })
    const data = response.json()
    return data
}


export async function getTheWishList() {
    const token  = await getMyToken()
    const response = await  fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers:{
             token:`${token}`,
        }
    })
    const data = await response.json()
    return data
}

export async function removeFromWishList(id:string) {
    const token = await getMyToken()
     const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{
        method:'DELETE',
        headers:{
              token:`${token}`,
        }
     })
     const data = await res.json()
     return data
}