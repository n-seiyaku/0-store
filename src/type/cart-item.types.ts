import { Topping } from '../lib/db/type'
import { Drink } from '../lib/db/type'

export type CartTopping = {
    id: string
    name: string
    price: number
}

export type CartItem = Drink & {
    itemId: string
    size: string
    ice: string
    sugar: string
    toppings: Topping[]
    note: string
    total: number
    quantity: number
}
