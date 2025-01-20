import client from "./base"


export interface Server {
    id: number
    label: string
    extension: string
    settings: Record<string, string>
}

export interface ServerSettings {
    display_name: string
    name: string
    placeholder: string
    type: string
    values: string[]
    description: string
    regex: string
}

/**
 * @returns a list of servers, without their settings
 */
export async function getServers(): Promise<Server[]> {
    return (await client.get("/admin/server")).data.servers
}

export async function getServer(id: number): Promise<Server> {
    return (await client.get(`/admin/server/${id}`)).data.server
}

export async function deleteServer(id: number): Promise<void> {
    await client.delete(`/admin/server/${id}`)
}

export async function getServerSettings(ext: string): Promise<ServerSettings[]> {
    return (await client.get("/admin/server/extension-settings", {params: {extension: ext}})).data.settings
}

export async function createServer(server: Omit<Server, "id">): Promise<void> {
    await client.post("/admin/server", server)
}

export async function updateServer(id: number, server: Omit<Server, "id">): Promise<void> {
    await client.put(`/admin/server/${id}`, server)
}