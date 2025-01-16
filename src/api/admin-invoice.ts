import client from "./base"



export interface Invoice {
    id: number
    user_id: number
    status: string
    cancellation_reason: string
    paid_at: number | null
    due_at: number
    amount: string
    created_at: number
}

export async function searchInvoices(status: string, user_id: number, page: number): Promise<{invoices: Invoice[], total_pages: number}> {
    return (await client.get("/admin/invoice", {params: {status, user_id, page}})).data
}
