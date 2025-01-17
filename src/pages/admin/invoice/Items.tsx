import { useEffect, useState } from "react";
import { createInvoiceItem, deleteInvoiceItem, getInvoice, InvoiceWithUsername, Item, updateInvoiceItem } from "../../../api/admin-invoice";
import LoadingError from "../../../components/LoadingError";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Delete from "../../../components/Delete";
import { cloneDeep } from "lodash";
import Dialog from "../../../components/Dialog";
import Stack from "../../../components/Stack";
import Input from "../../../components/Input";



export default function Items({ id }: { id: number }) {
    const [loading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState<InvoiceWithUsername | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string>("");
    const [edit, setEdit] = useState<Item | null>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError("");
        setInvoice(null);
        setItems([]);

        getInvoice(id)
            .then(i => {
                setInvoice(i.invoice)
                setItems(i.items)
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id, refresh]);

    function onDelete(itemId: number) {
        setLoading(true);
        setError("");

        deleteInvoiceItem(id, itemId)
            .then(() => setRefresh(refresh + 1))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    function onAdd() {
        setLoading(true);
        setError("");

        createInvoiceItem(id)
            .then(() => setRefresh(refresh + 1))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    function onEdit() {
        if (edit === null) return;

        setLoading(true);
        setError("");

        updateInvoiceItem(id, edit.id, {
            description: edit.description,
            amount: edit.amount
        })
            .then(() => setRefresh(refresh + 1))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error} />

        <Button className="mt-5" onClick={onAdd}>Add</Button>

        <Dialog open={edit !== null} title="Edit item" onClose={() => setEdit(null)} positiveButton="Save" negativeButton="Cancel" onPositiveButtonClick={onEdit}>
            {
                edit !== null && <Stack>
                    <Input label="Description" value={edit.description} onChange={e => setEdit({...edit, description: e})}></Input>
                    <Input label="Amount" value={edit.amount} onChange={e => setEdit({...edit, amount: e})}></Input>
                </Stack>
            }
        </Dialog>

        {invoice && <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>Description</Th>
                    <Th>Linked item</Th>
                    <Th>Amount</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {items.map(i => <Tr key={i.id}>
                    <Td>
                        {i.description}
                    </Td>
                    <Td>
                        {i.type === "service" && <a className="text-primary underline" href={"/admin/service/" + i.item_id}>Service #{i.item_id}</a>}
                    </Td>
                    <Td>${i.amount}</Td>
                    <Td>
                        <button className="text-primary0" onClick={() => setEdit(cloneDeep(i))}>Edit</button>
                        <Delete className="ml-1" onDelete={() => onDelete(i.id)}></Delete>
                    </Td>
                </Tr>)}
                <Tr>
                    <Th className="text-right" colSpan={2}>Total</Th>
                    <Td>${invoice.amount}</Td>
                </Tr>
            </Tbody>
        </Table>}

    </>
}