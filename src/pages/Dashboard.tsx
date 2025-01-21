import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/UserContext"
import Card from "../components/Card"
import Button from "../components/Button"
import { Link } from "react-router"
import { getInvoices, Invoice } from "../api/invoice"
import LoadingError from "../components/LoadingError"
import Table from "../components/Table"
import Thead from "../components/Thead"
import Tr from "../components/Tr"
import Th from "../components/Th"
import Tbody from "../components/Tbody"
import Td from "../components/Td"



export default function Dashboard() {
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>("")
    const [invoices, setInvoices] = useState<Invoice[]>([])

    useEffect(() => {
        setLoading(false)
        setError("")
        getInvoices(1)
            .then(i => setInvoices(i.invoices.slice(0, 5)))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    if (!user) {
        return <div>Not logged in</div>
    }

    return <>
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <LoadingError loading={loading} error={error} />

        <div className="mt-3 grid grid-cols-12 gap-3">

            <div className="col-span-12 lg:col-span-3">
                <Card title="Your info">
                    <div className="flex flex-col">
                        <strong>Name</strong>
                        <span>{user.name}</span>
                        <strong>Email</strong>
                        <span>{user.email}</span>
                        <strong>Address</strong>
                        <span>{user.address}</span>
                    </div>
                    <Button className="mt-3" variant="outlined">Edit</Button>
                </Card>

                <Card title="Shortcuts" className="mt-3">
                    <ul>
                        <li><Link to="/store" className="text-primary underline">Order a service</Link></li>
                        <li><Link to="/logout" className="text-primary underline">Logout</Link></li>
                    </ul>
                </Card>
            </div>

            <div className="col-span-12 lg:col-span-9">
                <Card title="Services" className="">
                    <span>TODO</span>
                </Card>

                <Card title="Invoices" className="mt-3">
                    {(invoices.length === 0 && !loading) && <span>No invoice found</span>}
                    {invoices.length > 0 && <>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Status</Th>
                                    <Th>Amount</Th>
                                    <Th>Due at</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {invoices.map(i => <Tr key={i.id}>
                                    <Td><Link className="underline text-primary" to={"/dashboard/invoice/" + i.id}>{i.id}</Link></Td>
                                    <Td>{i.status}</Td>
                                    <Td>${i.amount}</Td>
                                    <Td>{new Date(i.due_at * 1000).toLocaleString()}</Td>
                                </Tr>)}
                            </Tbody>
                        </Table>
                        <Link to="/dashboard/invoice"><Button className="mt-1">View all</Button></Link>
                    </>}
                </Card>
            </div>
        </div>
    </>
}