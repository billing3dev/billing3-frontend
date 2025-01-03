import { useState } from "react";
import { CategoryEdit, addCategory } from "../../../api/admin-category";
import LoadingError from "../../../components/LoadingError";
import Form from "./Form";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";


export default function CategoryAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [category, setCategory] = useState<CategoryEdit>({
        name: "",
        description: ""
    });

    function onSubmit() {
        setLoading(true);
        setError("");

        addCategory(category)
            .then(() => {
                navigate("/admin/category");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return <>
        <h1 className="text-3xl font-bold">Add category</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <div className="mt-3">
            <Form category={category} onChange={setCategory}></Form>
        </div>

        <Button className="mt-3" onClick={onSubmit}>Submit</Button>
    </>
}