import getOrders from '@/apis/orders'
import React from 'react'

export default async function page() {
const orders = await getOrders()
console.log(orders)
  return (
    <div>page</div>
  )
}
