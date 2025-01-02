import { ReactNode } from "react";


export default function Stack({ children, className }: { children: ReactNode, className?: string }) {
    return <div className={"flex flex-col gap-3 " + (className || "")}>
        {children}
    </div>
}