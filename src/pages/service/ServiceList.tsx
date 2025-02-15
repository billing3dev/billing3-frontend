import { useEffect, useState } from "react";
import { getServices, Service } from "../../api/service";
import LoadingError from "../../components/LoadingError";
import Table from "../../components/Table";
import Thead from "../../components/Thead";
import Th from "../../components/Th";
import Tr from "../../components/Tr";
import Tbody from "../../components/Tbody";
import Td from "../../components/Td";
import Status from "../../components/Status";
import { Link } from "react-router";



export default function ServiceList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setServices([]);
        getServices()
            .then(r => {
                setServices(r);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return <>

        <h1 className="text-3xl font-bold">Services</h1>

        <LoadingError loading={loading} error={error} />

        <Table className="mt-3">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Status</Th>
                    <Th>Label</Th>
                    <Th>Expiry date</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {services.map(service => <Tr key={service.id}>
                    <Td>{service.id}</Td>
                    <Td><Status status={service.status}></Status></Td>
                    <Td>{service.label}</Td>
                    <Td>{new Date(service.expires_at * 1000).toLocaleString()}</Td>
                    <Td><Link className="text-primary underline" to={`/dashboard/service/${service.id}`}>View</Link></Td>
                </Tr>)}
            </Tbody>
        </Table>

    </>

}