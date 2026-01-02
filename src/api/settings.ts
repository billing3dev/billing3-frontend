import client from "./base"


export interface PublicSettings {
    site_name: string
    cf_turnstile_site_key: string
    index_markdown: string
}


export async function getSettings(): Promise<PublicSettings> {
    return (await client.get("/setting")).data.data;
}
