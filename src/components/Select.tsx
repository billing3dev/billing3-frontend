import { ReactNode, useEffect, useRef } from "react"


interface IProps {
    disabled?: boolean
    value: string
    onChange?: (v: string) => void
    className?: string
    children: ReactNode
    label?: string
    helperText?: string
}

export default function Select({disabled, className, value, onChange, children, label, helperText}: IProps) {
    const ref = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (ref.current !== null && ref.current.value !== value && onChange) {
            onChange(ref.current.value);
        }
    }, [ref, value, onChange]);

    return <div className="flex flex-col">
        {label && <label className="mb-1">{label}</label>}
        <select
            ref={ref}
            className={"dark:[color-scheme:dark] rounded bg-surface border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent " + (className || "")}
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            disabled={disabled === true}
        >
            {children}
        </select>
        {helperText && <span className="text-sm mt-1 text-on-surface2">{helperText}</span>}
    </div>
}