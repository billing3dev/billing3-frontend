import Input from "./Input";


export default function Datetime({label, value, onChange, readOnly}: {label: string, value: number, onChange?: (value: number) => void, readOnly?: boolean}) {
    
    function pad(n: number) {
        return n < 10 ? "0" + n : n.toString();
    }

    const date = new Date(value * 1000);
    const dateString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;


    function onChangeString(s: string) {
        const timestamp = +new Date(s) / 1000;
        if (timestamp < 0 || isNaN(timestamp)) return;
        if (onChange) onChange(timestamp);
    }
    return <Input type="datetime-local" value={dateString} label={label} onChange={onChangeString} readOnly={readOnly}></Input>
}