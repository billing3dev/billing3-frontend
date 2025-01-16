import { useEffect, useState } from "react";
import { Invoice, searchInvoices } from "../../../api/admin-invoice";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Pagination from "../../../components/Pagination";


export default function InvoiceList() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState(0);

    function search(status: string, user_id: number, page: number) {
        setLoading(true);
        setError("");
        setTotalPages(1);
        setPage(1);
        setInvoices([]);

        searchInvoices(status, user_id, page).then(({ invoices, total_pages }) => {
            setInvoices(invoices);
            setTotalPages(total_pages);
            setPage(1);
        })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        search("", 0, 1);
    }, []);

    return <>
        <h1 className="text-3xl font-bold">Invoices</h1>

        <LoadingError loading={loading} error={error} />

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>User</Th>
                    <Th>Status</Th>
                    <Th>Amount</Th>
                    <Th>Due At</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    invoices.map((invoice) => <Tr key={invoice.id}>
                        <Td>{invoice.id}</Td>
                        <Td>{invoice.user_id}</Td>
                        <Td>{invoice.status}</Td>
                        <Td>{invoice.amount}</Td>
                        <Td>{new Date(invoice.due_at * 1000).toLocaleString()}</Td>
                        <Td>
                            <button className="text-blue-500">Edit</button>
                        </Td>
                    </Tr>)
                }
            </Tbody>
        </Table>

        <Pagination className="mt-5" page={page} total_pages={totalPages} onChange={p => setPage(p)}></Pagination>
    </>;
}