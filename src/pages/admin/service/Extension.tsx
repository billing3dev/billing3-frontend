import { useEffect, useState } from "react"
import { doAction, getAdminActions } from "../../../api/admin-service";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import LoadingError from "../../../components/LoadingError";

const LOADING_HTML = "data:text/html;base64,PGRpdiBjbGFzcz0ibG9hZGVyIj48L2Rpdj4KPHN0eWxlPgoubG9hZGVyIHsKICBib3JkZXI6IDEzcHggc29saWQgI2YzZjNmMzsKICBib3JkZXItdG9wOiAxM3B4IHNvbGlkICMzNDk4ZGI7CiAgYm9yZGVyLXJhZGl1czogNTAlOwogIHdpZHRoOiA2MHB4OwogIGhlaWdodDogNjBweDsKICBhbmltYXRpb246IHNwaW4gMnMgbGluZWFyIGluZmluaXRlOwogIG1hcmdpbjogMjBweDsKfQpAa2V5ZnJhbWVzIHNwaW4gewogIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0KICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfQp9CmJvZHkgewogIGJhY2tncm91bmQtY29sb3I6ICMxMTEzMTg7Cn0KPC9zdHlsZT4=";

export default function Extension({ id }: { id: number }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [actions, setActions] = useState<string[]>([]);
    const [success, setSuccess] = useState("");
    const [iframeSrc, setIframeSrc] = useState(LOADING_HTML);

    useEffect(() => {
        setIframeSrc(LOADING_HTML);
        setLoading(true);
        setError("");
        setActions([]);
        getAdminActions(id)
            .then(r => {
                setActions(r)
                setIframeSrc("/api/admin/service/" + id + "/info");
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    function onClick(action: string) {
        setLoading(true);
        setError("");
        doAction(id, action)
            .then(() => setSuccess(`Task ${action} has been scheduled`))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error}></LoadingError>
        {success && <div className="mb-3"><Alert severity="success">{success}</Alert></div>}
        <div className="flex flex-wrap gap-2">
            {actions.map(a => <Button key={a} onClick={() => onClick(a)}>{a.toUpperCase()}</Button>)}
        </div>

        <iframe src={iframeSrc} className="h-[60vh] w-full mt-3 bg-white select-none"></iframe>
    </>
}