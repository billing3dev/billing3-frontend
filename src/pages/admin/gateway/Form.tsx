import { cloneDeep } from "lodash";
import Input from "../../../components/Input";
import Stack from "../../../components/Stack";
import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import { Gateway, GatewaySettings, getGatewaySettings } from "../../../api/admin-gateways";
import Select from "../../../components/Select";
import Checkbox from "../../../components/Checkbox";




export default function Form({ gateway, onChange }: { gateway: Gateway, onChange: (s: Gateway) => void }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [settings, setSettings] = useState<GatewaySettings[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setSettings([]);

        getGatewaySettings(gateway.name)
            .then((data) => {
                setSettings(data);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));

    }, [gateway.name]);


    function onDisplayNameChange(label: string) {
        const cloned = cloneDeep(gateway);
        cloned.display_name = label;
        onChange(cloned);
    }

    function onSettingChange(name: string, value: string) {
        const cloned = cloneDeep(gateway);
        cloned.settings[name] = value;
        onChange(cloned);
    }

    function onEnabledChange(enabled: boolean) {
        const cloned = cloneDeep(gateway);
        cloned.enabled = enabled;
        onChange(cloned);
    }

    function onFeeChange(fee: string) {
        const cloned = cloneDeep(gateway);
        cloned.fee = fee;
        onChange(cloned);
    }

    return <Stack>
        <LoadingError loading={loading} error={error}></LoadingError>

        <Input label="Display Name" value={gateway.display_name} onChange={onDisplayNameChange}></Input>

        
        <Checkbox checked={gateway.enabled} label="Enabled" onChange={onEnabledChange}></Checkbox>

        <Input label="Fee" value={gateway.fee} onChange={onFeeChange} helperText="Input a number for fixed fee or a percentage (ends with %)."></Input>

        {settings.map(s => {
            if (s.type === "string") {
                return <Input key={s.name} label={s.display_name} value={gateway.settings[s.name] || ""} onChange={e => onSettingChange(s.name, e)}></Input>
            } else if (s.type === "select") {
                return <Select key={s.name} label={s.display_name} value={gateway.settings[s.name] || ""} onChange={e => onSettingChange(s.name, e)}>
                    {s.values.map(v => <option key={v} value={v}>{v}</option>)}
                </Select>
            } else {
                return <div key={s.name}></div>
            }
        })}
    </Stack>
}