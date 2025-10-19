
import { CategoryType } from '@/interfaces/catecories'

export default async function getCategorie(): Promise<CategoryType[]> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const data = await res.json()
  return data.data 
}

export async function getSpecificCategorie(prodID: string): Promise<CategoryType[]> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${prodID}/subcategories`)
  const data = await res.json()
  return data.data 
}
