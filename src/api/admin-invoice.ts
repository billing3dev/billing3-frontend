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

export interface Item {
    id: number
    invoice_id: number
    description: string
    amount: string
    type: string
    item_id: number
    created_at: number
}

export interface Payment {
    id: number
    invoice_id: number
    created_at: number
    description: string
    amount: string
    reference_id: string
    gateway: string
}

export type InvoiceWithUsername = Invoice & {username: string}

export type InvioceEdit = Omit<Invoice, "id" | "user_id" | "amount" | "created_at">

export async function searchInvoices(status: string, user_id: number, page: number): Promise<{invoices: Invoice[], total_pages: number}> {
    return (await client.get("/admin/invoice", {params: {status, user: user_id, page}})).data
}

export async function getInvoice(id: number): Promise<{invoice: InvoiceWithUsername, items: Item[]}> {
    return (await client.get(`/admin/invoice/${id}`)).data
}

export async function updateInvoice(id: number, i: InvioceEdit) {
    await client.put(`/admin/invoice/${id}`, i);
}

export async function deleteInvoiceItem(id: number, itemId: number) {
    await client.delete(`/admin/invoice/${id}/item/${itemId}`);
}

export async function createInvoiceItem(id: number) {
    await client.post(`/admin/invoice/${id}/item`, {
        description: "New item",
        amount: "0",
    });
}

export async function updateInvoiceItem(id: number, itemId: number, i: {description: string, amount: string}) {
    await client.put(`/admin/invoice/${id}/item/${itemId}`, i);
}

export async function getPayments(id: number): Promise<Payment[]> {
    return (await client.get(`/admin/invoice/${id}/payment`)).data.payments
}

export async function createPayment(id: number, p: {description: string, amount: string}) {
    await client.post(`/admin/invoice/${id}/payment`, p);
}