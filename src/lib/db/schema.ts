import {
    pgTable,
    uuid,
    text,
    boolean,
    timestamp,
    integer,
    varchar,
    serial,
    unique,
    index,
    jsonb,
    pgEnum,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// --- 1. Bảng Love Sentences ---
export const loveSentences = pgTable(
    'love_sentences',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        sentence: text('sentence').notNull(),
        isLovingCaring: boolean('is_loving_caring').notNull(),
        reason: text('reason').notNull(),
        createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    },
    (t) => [index('idx_sentence').on(t.sentence)],
)

// --- 2. Bảng Brands ---
export const brands = pgTable('brands', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull().unique(),
})

export const brandsRelations = relations(brands, ({ many }) => ({
    categories: many(categories),
    toppings: many(toppings),
}))

// --- 3. Bảng Categories ---
export const categories = pgTable(
    'categories',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        brandId: uuid('brand_id')
            .notNull()
            .references(() => brands.id, { onDelete: 'cascade' }),
        name: text('name').notNull(),
    },
    (t) => [unique('uq_brand_category').on(t.brandId, t.name)],
)

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    brand: one(brands, {
        fields: [categories.brandId],
        references: [brands.id],
    }),
    drinks: many(drinks),
}))

// --- 4. Bảng Drinks ---
export const drinks = pgTable(
    'drinks',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        categoryId: uuid('category_id')
            .notNull()
            .references(() => categories.id, { onDelete: 'cascade' }),
        name: text('name').notNull(),
        price: integer('price').notNull(),
        imageUrl: text('image_url').notNull(),
    },
    (t) => [unique('uq_category_drink').on(t.categoryId, t.name)],
)

export const drinksRelations = relations(drinks, ({ one }) => ({
    category: one(categories, {
        fields: [drinks.categoryId],
        references: [categories.id],
    }),
}))

// --- 5. Bảng Toppings ---
export const toppings = pgTable(
    'toppings',
    {
        id: serial('id').primaryKey(),
        brandId: uuid('brand_id')
            .notNull()
            .references(() => brands.id, { onDelete: 'cascade' }),
        name: varchar('name', { length: 255 }).notNull(),
        price: integer('price').notNull(),
    },
    (t) => [unique('uq_brand_topping').on(t.brandId, t.name)],
)

export const toppingsRelations = relations(toppings, ({ one }) => ({
    brand: one(brands, {
        fields: [toppings.brandId],
        references: [brands.id],
    }),
}))

// --- 6. Bảng Orders ---
export const discountTypeEnum = pgEnum('discount_type', ['percentage', 'fixed'])

export const orders = pgTable('orders', {
    id: uuid('id').defaultRandom().primaryKey(),
    customerName: text('customer_name').notNull(),
    customerPhone: text('customer_phone').notNull(),
    customerEmail: text('customer_email'),
    shippingAddress: text('shipping_address').notNull(),
    shippingNote: text('shipping_note'),
    totalAmount: integer('total_amount').notNull(),
    paymentMethod: text('payment_method').notNull(),
    discount: integer('discount').notNull().default(0),
    discountType: discountTypeEnum('discount_type').notNull(),
    status: text('status').notNull().default('pending'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const ordersRelations = relations(orders, ({ many }) => ({
    items: many(orderItems),
}))

// --- 7. Bảng Order Items ---
export const orderItems = pgTable('order_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    orderId: uuid('order_id')
        .notNull()
        .references(() => orders.id, { onDelete: 'cascade' }),
    drinkName: text('drink_name').notNull(),
    drinkImage: text('drink_image'),
    quantity: integer('quantity').notNull(),
    unitPrice: integer('unit_price').notNull(),
    totalPrice: integer('total_price').notNull(),
    toppings: jsonb('toppings').$type<any[]>().default([]),
    note: text('note'),
})

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
}))
