
const mainApi = "https://ecommerce.routemisr.com/api/v1/"
export default async function getProductApi()
{
    const res = await fetch(mainApi +"products",
        {
            cache:"no-store"
        }
    )
    const {data} = await res.json()
    return data
}