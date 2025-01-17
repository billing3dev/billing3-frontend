import { useEffect, useState } from "react";
import { getInvoice, InvoiceWithUsername, updateInvoice } from "../../../api/admin-invoice";
import LoadingError from "../../../components/LoadingError";
import Input from "../../../components/Input";
import Stack from "../../../components/Stack";
import Select from "../../../components/Select";
import { cloneDeep } from "lodash";
import Datetime from "../../../components/Datetime";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";



export default function Basic({ id }: { id: number }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState<InvoiceWithUsername | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        setError("");
        setInvoice(null);

        getInvoice(id)
            .then(i => setInvoice(i.invoice))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    function onStatusChange(status: string) {
        if (!invoice) return;
        const cloned = cloneDeep(invoice);
        cloned.status = status;
        if (status === "PAID") {
            cloned.paid_at = Math.floor(Date.now() / 1000);
        } else {
            cloned.paid_at = null;
        }
        if (status === "CANCELLED") {
            cloned.cancellation_reason = "";
        }

        setInvoice(cloned);
    }

    function onDueAtChange(d: number) {
        if (!invoice) return;
        const cloned = cloneDeep(invoice);
        cloned.due_at = d;
        setInvoice(cloned);
    }

    function onPaidAtChange(d: number) {
        if (!invoice) return;
        const cloned = cloneDeep(invoice);
        cloned.paid_at = d;
        setInvoice(cloned);
    }

    function onCancellationReasonChange(v: string) {
        if (!invoice) return;
        const cloned = cloneDeep(invoice);
        cloned.cancellation_reason = v;
        setInvoice(cloned);
    }

    function onSubmit() {
        if (!invoice) return;

        setLoading(true);
        setError("");

        updateInvoice(id, invoice)
            .then(() => navigate("/admin/invoice"))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error} />

        {invoice && <Stack className="mt-5">
            <Input label="User" readOnly value={"#" + invoice.user_id + " " + invoice.username}></Input>

            <Datetime label="Created at" value={invoice.created_at} readOnly></Datetime>

            <Datetime label="Due at" value={invoice.due_at} onChange={onDueAtChange}></Datetime>

            <Select label="Status" value={invoice.status} onChange={onStatusChange} helperText="Change status here will not trigger automated jobs.">
                <option value="UNPAID">Unpaid</option>
                <option value="PAID">Paid</option>
                <option value="CANCELLED">Cancelled</option>
            </Select>

            {(invoice.status === "CANCELLED") && <Input label="Cancellation reason" value={invoice.cancellation_reason} onChange={onCancellationReasonChange}></Input>}

            {(invoice.status === "PAID" && invoice.paid_at) && <Datetime label="Paid at" value={invoice.paid_at} onChange={onPaidAtChange}></Datetime>}

            <div><Button onClick={onSubmit}>Save</Button></div>
        </Stack>}

    </>
}