
const mainApi = "https://ecommerce.routemisr.com/api/v1/"
export default async function getSingleProductApi(prodID:any)
{
   const res = await fetch(`${mainApi}products/${prodID}`)
    const {data} = await res.json()
    return data
}