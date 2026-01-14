import { type InferSelectModel } from 'drizzle-orm'
import { toppings, brands, drinks, categories } from './schema'

export type Topping = InferSelectModel<typeof toppings>
export type Category = InferSelectModel<typeof categories>
export type Brand = InferSelectModel<typeof brands>
export type Drink = InferSelectModel<typeof drinks>
