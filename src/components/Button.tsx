import { ReactNode } from "react";

interface IProps {
    children?: ReactNode
    onClick?: () => void
    className?: string
    variant?: "filled" | "outlined"
}

export default function Button({ children, onClick, className, variant }: IProps) {
    let clazz = "rounded p-2 font-bold text-on-primary transition-colors " + (className || "");

    if (variant === undefined || variant === "filled") {
        clazz += "bg-primary hover:bg-primary2 active:bg-primary3"
    } else {
        clazz += "text-primary ring-inset ring-1 ring-primary hover:ring-0 active:ring-0 hover:bg-primary2 active:bg-primary3 hover:text-on-primary"
    }

    return <button
        type="button"
        onClick={() => { if (onClick !== undefined) onClick(); }}
        className={clazz}
    >
        {children}
    </button>
}