import client from "./base"

export interface Category {
    id: number
    name: string
    description: string
}

export type CategoryEdit = Omit<Category, "id">

export async function getCategories(): Promise<Category[]> {
    return (await client.get("/admin/category")).data.categories
}

export async function getCategory(id: number): Promise<Category> {
    return (await client.get(`/admin/category/${id}`)).data.category
}

export async function updateCategory(id: number, category: CategoryEdit): Promise<void> {
    await client.put(`/admin/category/${id}`, category)
}

export async function deleteCategory(id: number): Promise<void> {
    await client.delete(`/admin/category/${id}`)
}

export async function addCategory(category: CategoryEdit): Promise<void> {
    await client.post(`/admin/category`, category)
}