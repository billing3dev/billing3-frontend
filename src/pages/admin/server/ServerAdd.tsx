import { useState } from "react";
import LoadingError from "../../../components/LoadingError";
import Form from "./Form";
import { createServer, Server } from "../../../api/admin-server";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";



export function ServerAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [server, setServer] = useState<Server>({
        id: 0,
        label: "",
        extension: "None",
        settings: {}
    });

    function onSubmit() {
        setLoading(true);
        setError("");

        createServer(server)
            .then(() => navigate("/admin/server"))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <div>
        <h1 className="text-3xl font-bold">Add Server</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <div className="mt-5">
            <Form server={server} onChange={setServer}></Form>
        </div>

        <Button onClick={onSubmit} className="mt-5">Save</Button>
    </div>
}