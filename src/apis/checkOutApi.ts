import { CheckoutSchemaForm } from "@/schema/checkOut.Schema";
import getMyToken from "@/utilites/getMyToken";

export async function mackeOnlinePayment(cartId:string , domain:string , formValues:CheckoutSchemaForm)
{
    const token = await getMyToken()
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${domain}`,
        {
            method:'POST',
              headers:{
                  token:`${token}`,
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                shippingAddress:formValues
              })
        }
      )

      const data = await res.json()
      return data
}


export async function mackeCashPayment(cartId:string ,formValues:CheckoutSchemaForm)
{
    const token = await getMyToken()
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
            method:'POST',
              headers:{
                 token:`${token}`,
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                shippingAddress:formValues
              })
        }
      )

      const data = await res.json()
      return data
}