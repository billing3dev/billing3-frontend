

export function YesNo({ value, className }: { value: boolean, className?: string }) {
    if (value) {
        return <span className={"text-green-500 " + className}>Yes</span>
    }
    return <span className={"text-red-500 " + className}>No</span>
}