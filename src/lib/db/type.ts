import { type InferSelectModel } from 'drizzle-orm'
import {
    toppings,
    brands,
    drinks,
    categories,
    orders,
    orderItems,
    loveSentences,
} from './schema'

export type Topping = InferSelectModel<typeof toppings>
export type LoveSentence = InferSelectModel<typeof loveSentences>
export type Category = InferSelectModel<typeof categories>
export type Brand = InferSelectModel<typeof brands>
export type Drink = InferSelectModel<typeof drinks>
export type Order = InferSelectModel<typeof orders>
export type OrderItem = InferSelectModel<typeof orderItems>
