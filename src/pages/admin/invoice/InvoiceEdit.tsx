import { useParams } from "react-router";
import Tab from "../../../components/Tab";
import { useState } from "react";
import Basic from "./Basic";
import Items from "./Items";
import Payments from "./Payments";


export default function InvoiceEdit() {
    const { id } = useParams();
    const [selected, setSelected] = useState("BASIC");

    return <>
        <h1 className="text-3xl font-bold">Invoice #{id}</h1>

        <Tab className="mt-5" tabs={["BASIC", "ITEMS", "PAYMENTS"]} selected={selected} onSelect={setSelected}></Tab>

        {selected === "BASIC" && <Basic id={parseInt(id!)}></Basic>}
        {selected === "ITEMS" && <Items id={parseInt(id!)}></Items>}
        {selected === "PAYMENTS" && <Payments id={parseInt(id!)}></Payments>}

    </>
}