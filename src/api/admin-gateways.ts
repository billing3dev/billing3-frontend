import client from "./base"


export interface Gateway {
    id: number
    display_name: string
    name: string
    settings: Record<string, string>
    enabled: boolean
    fee: string
}

export interface GatewaySettings {
    display_name: string
    name: string
    placeholder: string
    type: string
    values: string[]
    description: string
    regex: string
}

export async function getGateways(): Promise<Gateway[]> {
    return (await client.get("/admin/gateway")).data.gateways
}

export async function getGateway(id: number): Promise<Gateway> {
    return (await client.get(`/admin/gateway/${id}`)).data.gateway
}

export async function deleteGateway(id: number): Promise<void> {
    await client.delete(`/admin/gateway/${id}`)
}

export async function getGatewaySettings(g: string): Promise<GatewaySettings[]> {
    return (await client.get("/admin/gateway/settings", {params: {name: g}})).data.settings
}

export async function updateGateway(id: number, gateway: Omit<Gateway, "id" | "name">): Promise<void> {
    await client.put(`/admin/gateway/${id}`, gateway)
}