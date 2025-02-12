import { useEffect, useState } from "react"
import { doAction, getAdminActions } from "../../../api/admin-service";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import LoadingError from "../../../components/LoadingError";



export default function Extension({ id }: { id: number }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [actions, setActions] = useState<string[]>([]);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        setActions([]);
        getAdminActions(id)
            .then(r => setActions(r))
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
    </>
}