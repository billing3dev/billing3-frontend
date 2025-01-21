


export default function Checkbox({ checked, label, onChange}: { checked: boolean, label: string, onChange: (v: boolean) => void }) {
    return <div className="flex gap-2 items-center"><input onChange={() => onChange(!checked)} type="checkbox" className="rounded bg-surface border-outline focus:border-0" checked={checked}></input><label>{label}</label></div>
}