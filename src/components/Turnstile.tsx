import { useContext, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";

interface Props {
    onSuccess?: (token: string) => void;
}

export default function Turnstile({ onSuccess }: Props) {
    const { settings } = useContext(SettingsContext);

    useEffect(() => {
        if (!settings?.cf_turnstile_site_key) return;

        const turnstile = (window as any).turnstile;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const widgetId = turnstile.render("#turnstile-container", {
            sitekey: settings.cf_turnstile_site_key || "",
            callback: function (token: string) {
                if (onSuccess) {
                    console.debug("Turnstile success", token);
                    onSuccess(token);
                }
            },
            "theme": "dark",
            "appearance": "always"
        });


        console.debug("Render cloudflare turnstile", widgetId)

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            turnstile.remove(widgetId);
            console.debug("Remove cloudflare turnstile", widgetId)
        }

    }, [settings, onSuccess]);

    return (
        <div className="mt-4" id="turnstile-container"></div>
    );
}