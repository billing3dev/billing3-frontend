import { cloneDeep } from "lodash"

export interface Value {
    display_name: string
    value: string
}

interface IProps {
    label?: string
    values: Value[]
    selected: string[]
    helperText?: string
    onChange?: (selected: string[]) => void
}

export default function MultiSelect({ values, selected, label, helperText, onChange }: IProps) {

    function onCheck(value: string) {
        let cloned = cloneDeep(selected)
        if (cloned.includes(value)) {
            cloned = cloned.filter(v => v !== value)
        } else {
            cloned.push(value)
        }
        if (onChange) onChange(cloned)
    }

    return <div className="flex flex-col">
        {label && <label className="mb-1">{label}</label>}

        <div className="border border-outline rounded p-2 h-36 overflow-y-auto">
            {values.map(v => <div className="flex gap-2 items-center" key={v.value}><input onChange={() => onCheck(v.value)} type="checkbox" className="rounded bg-surface border-outline focus:border-0" checked={selected.includes(v.value)}></input><label>{v.display_name}</label></div>)}
        </div>

        {helperText && <span className="text-sm text-on-surface2">{helperText}</span>}
    </div>
}