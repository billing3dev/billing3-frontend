import { HTMLInputTypeAttribute } from "react"


interface IProps {
    readOnly?: boolean
    disabled?: boolean
    value?: string
    onChange?: (v: string) => void
    type?: HTMLInputTypeAttribute
    className?: string
    label: string
}

export default function Input(props: IProps) {
    return (
        <label className={props.className || ""}>
            {props.label}
            <input
                className={"mt-1 dark:[color-scheme:dark] rounded bg-surface border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"}
                value={props.value}
                onChange={e => props.onChange && props.onChange(e.target.value)}
                type={props.type === undefined ? "text" : props.type}
                readOnly={props.readOnly === true}
                disabled={props.disabled === true}
            ></input>
        </label>
    )
}