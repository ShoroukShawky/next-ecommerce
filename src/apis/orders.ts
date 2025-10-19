
import getMyId from "@/utilites/getMyId"


export default async function getOrders() {

  const userId = await getMyId()
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${userId}`,
    {
        headers:{
             "Content-Type":"application/json"
        }
    }
  )
  const data = await res.json()
  return data.data 
}