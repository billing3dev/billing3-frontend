import { ReactNode } from "react";

export default function Th({ children, className, colSpan }: { children?: ReactNode, className?: string, colSpan?: number }) {
    return (<td className={"p-3 font-bold " + (className || "")} colSpan={colSpan}>{children}</td>)
}