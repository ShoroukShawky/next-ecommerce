import { BrandsType } from '@/interfaces/brandsInterfacs'

export default async function getBrands(): Promise<BrandsType[]> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
  const data = await res.json()
  return data.data 
}

export async function getSpecificBrand(prodID: string): Promise<BrandsType> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${prodID}`)
  const { data } = await res.json()
  return data
}
