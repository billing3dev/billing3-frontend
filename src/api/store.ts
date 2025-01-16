import client from "./base"



export interface OrderRequest {
    product_id: number
    duration: number
    options: Record<string, string>
}

export interface Pricing {
    duration: number
    billing_cycle: string
    recurring_fee: string
    setup_fee: string
    items: PricingItem[]
}

export interface PricingItem {
    price: string
    description: string
}



export interface Category {
    id: number
    name: string
    description: string
}

export interface Product {
    id: number
    name: string
    description: string
    in_stock: boolean
    pricing: ProductPricing[]
}

export interface ProductPricing {
    display_name: string
    duration: number
    price: string
    setup_fee: string
}

export interface ProductOption {
    product_id: number;
    name: string;
    display_name: string;
    type: string;
    regex: string;
    values: ProductOptionValue[];
    description: string;
}

export interface ProductOptionValuePrice {
    duration: number;
    price: string;
    setup_fee: string;
}

export interface ProductOptionValue {
    value: string;
    display_name: string;
    prices: ProductOptionValuePrice[];
}

export async function getCategories(): Promise<Category[]> {
    return (await client.get("/store/category")).data.categories
}

export async function getCategory(id: number): Promise<Category> {
    return (await client.get(`/store/category/${id}`)).data.category
}

export async function getProducts(categoryId: number): Promise<Product[]> {
    return (await client.get(`/store/category/${categoryId}/product`)).data.products
}

export async function getProductOptions(id: number, duration: number): Promise<ProductOption[]> {
    return (await client.get(`/store/product/${id}/options`, {
        params: {
            duration
        }
    })).data.options
}

export async function getProduct(id: number): Promise<Product> {
    return (await client.get(`/store/product/${id}`)).data.product
}

export async function calculatePrice(req: OrderRequest): Promise<Pricing> {
    return (await client.post("/store/calculate-price", req)).data.pricing
}

/**
 * @returns invoice id
 */
export async function createOrder(req: OrderRequest): Promise<number> {
    return (await client.post("/store/order", req)).data.invoice
}

export async function calculatePricing(req: OrderRequest): Promise<Pricing> {
    return (await client.post("/store/calculate-price", req)).data.pricing
}