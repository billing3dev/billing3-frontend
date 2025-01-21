import client from "./base"

export interface Invoice {
    id: number
    user_id: number
    status: string
    cancellation_reason: string | null
    paid_at: number | null
    due_at: number
    amount: number
    created_at: number
}

export interface InvoiceItem {
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
    gateway: string
    description: string
    amount: string
    created_at: number
}

export interface Gateway {
    display_name: string
    name: string
}

export async function getInvoices(page: number): Promise<{invoices: Invoice[], total_pages: number}> {
    return (await client.get("/invoice", {params: {page}})).data;
}

export async function getInvoice(invoice_id: number): Promise<{invoice: Invoice, items: InvoiceItem[]}> {
    return (await client.get(`/invoice/${invoice_id}`)).data;
}

export async function getPayments(invoice_id: number): Promise<Payment[]> {
    return (await client.get(`/invoice/${invoice_id}/payments`)).data.payments;
}

export async function getGateways(): Promise<Gateway[]> {
    return (await client.get("/invoice/gateways")).data.gateways;
}

export async function payNow(invoice_id: number, gateway: string): Promise<string> {
    return (await client.post(`/invoice/${invoice_id}/pay`, {gateway})).data.payment_url;
}