import client from "./base"


export interface Settings {
    site_name: string
    cf_turnstile_site_key: string
    cf_turnstile_secret: string
    index_markdown: string
}


export async function getSettings(): Promise<Settings> {
    return (await client.get("/admin/setting")).data.data;
}

export async function updateSettings(s: Settings) {
    await client.put("/admin/setting", s);
}