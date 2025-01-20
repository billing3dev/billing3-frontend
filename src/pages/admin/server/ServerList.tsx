import { useEffect, useState } from "react";
import { deleteServer, getServers, Server } from "../../../api/admin-server";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import { Link } from "react-router";
import Delete from "../../../components/Delete";
import Button from "../../../components/Button";



export default function ServerList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [servers, setServers] = useState<Server[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError("");
        setServers([]);
        getServers()
            .then((data) => setServers(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [refresh]);

    function onDelete(id: number) {
        setLoading(true);
        setError("");
        deleteServer(id)
            .then(() => setRefresh(refresh + 1))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }

    return <>
        <h1 className="text-3xl font-bold">Servers</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <Link to={"/admin/server/add"}><Button className="mt-5">Add</Button></Link>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Label</Th>
                    <Th>Extension</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {servers.map((server) => (
                    <Tr key={server.id}>
                        <Td>{server.id}</Td>
                        <Td>{server.label}</Td>
                        <Td>{server.extension}</Td>
                        <Td>
                            <Link to={`/admin/server/${server.id}`} className="text-blue-500">Edit</Link>
                            <Delete className="ml-1" onDelete={() => onDelete(server.id)}></Delete>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </>

}