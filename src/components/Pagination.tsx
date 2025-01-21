
interface IProps {
    page: number
    totalPages: number
    onChange: (page: number) => void
    className?: string
}

export default function Pagination(props: IProps) {

    const pages = [];
    for (let i = props.page - 2; i <= props.page + 2; i++) {
        if (i < 1 || i > props.totalPages) continue;
        pages.push(i);
    }

    return (
        <div className={"flex gap-2 flex-wrap " + (props.className || "")}>
            <button className="rounded bg-container text-white px-3 py-1" disabled={props.page === 1} onClick={() => props.onChange(props.page - 1)}>
                <span className="material-symbols-outlined text-base">arrow_back</span>
            </button>

            {
                pages[0] > 1 && <button className={"rounded px-3 py-1 bg-container text-white"} onClick={() => props.onChange(1)}>
                    1
                </button>
            }

            {
                pages[0] > 2 && <button className={"rounded px-3 py-1 bg-container text-white"} disabled={true}>
                    ...
                </button>
            }

            {
                pages.map((p) => <button key={p} className={"rounded px-3 py-1 " + (p === props.page ? "bg-primary text-on-primary" : "bg-container text-white")} onClick={() => props.onChange(p)}>
                    {p}
                </button>)
            }

            {
                pages[pages.length - 1] < props.totalPages - 1 && <button className={"rounded px-3 py-1 bg-container text-white"} disabled={true}>
                    ...
                </button>
            }

            {
                pages[pages.length - 1] < props.totalPages && <button className={"rounded px-3 py-1 bg-container text-white"} onClick={() => props.onChange(props.totalPages)}>
                    {props.totalPages}
                </button>
            }

            <button className="rounded bg-container text-white px-3 py-1" disabled={props.page === props.totalPages} onClick={() => props.onChange(props.page + 1)}>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
        </div>
    )
}