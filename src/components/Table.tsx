import { ReactNode } from "react";

export default function Table({ children, className }: { children?: ReactNode, className?: string }) {
    return (
        <div className={"w-full " + (className || "")}>
            <table className={"rounded table-auto w-full bg-container divide-y divide-outline"}>
                {children}
            </table>
        </div>
    )
}