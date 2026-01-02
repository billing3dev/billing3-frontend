import { useEffect, useState } from "react";
import { Settings as SettingsType, getSettings, updateSettings } from "../../../api/admin-settings";
import Input from "../../../components/Input";
import LoadingError from "../../../components/LoadingError";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import Stack from "../../../components/Stack";





export default function Settings() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [settings, setSettings] = useState<SettingsType | null>(null);
    const navigate = useNavigate();
    


    useEffect(() => {
        setLoading(true);
        setError("");

        getSettings()
            .then((data) => {
                setSettings(data);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));

    }, []);


    function onChange(k: string, v: string) {
        if (!settings) return;
        
        const cloned = structuredClone(settings);
        (cloned as any)[k] = v;
        setSettings(cloned);
    }


    function onSave() {
        if (!settings) return;
        
        setLoading(true);
        setError("");

        updateSettings(settings)
            .then(() => {
                navigate("/admin/settings");
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }

    return <>
        <h1 className="text-3xl font-bold">Settings</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <Stack>

            <Input label="Site Name" value={settings?.site_name || ""} onChange={v => onChange("site_name", v)}></Input>
            <Input label="Cloudflare Turnstile Site Key" value={settings?.cf_turnstile_site_key || ""} onChange={v => onChange("cf_turnstile_site_key", v)}></Input>
            <Input label="Cloudflare Turnstile Secret" value={settings?.cf_turnstile_secret || ""} onChange={v => onChange("cf_turnstile_secret", v)}></Input>
            <Textarea label="Home page (Markdown)" value={settings?.index_markdown || ""} onChange={v => onChange("index_markdown", v)}></Textarea>

        </Stack>

        <Button onClick={onSave}>Save</Button>
    </>
}


