import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import Form from "./Form";
import { getServer, Server, updateServer } from "../../../api/admin-server";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router";



export function ServerEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [server, setServer] = useState<Server | null>(null);

    function onSubmit() {
        setLoading(true);
        setError("");

        updateServer(parseInt(id!), server!)
            .then(() => navigate("/admin/server"))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setLoading(true);
        setError("");
        setServer(null);
        getServer(parseInt(id!))
            .then((data) => setServer(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    return <div>
        <h1 className="text-3xl font-bold">Server #{id}</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        {server && <div className="mt-5">
            <Form server={server} onChange={setServer}></Form>
        </div>}

        <Button onClick={onSubmit} className="mt-5">Save</Button>
    </div>
}