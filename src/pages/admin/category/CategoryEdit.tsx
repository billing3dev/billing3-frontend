import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import { CategoryEdit as ApiCategoryEdit, getCategory, updateCategory } from "../../../api/admin-category";
import { useNavigate, useParams } from "react-router";
import Form from "./Form";
import Button from "../../../components/Button";


export default function CategoryEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<ApiCategoryEdit | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        setCategory(null);

        getCategory(parseInt(id!))
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);


    function onSubmit() {
        if (!category) return;

        setLoading(true);
        setError("");

        updateCategory(parseInt(id!), category)
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

    return (
        <>
            <h1 className="text-3xl">Category #{id}</h1>

            <LoadingError loading={loading} error={error}></LoadingError>

            {
                category && <div className="mt-3">
                    <Form category={category} onChange={setCategory}></Form>
                    <Button className="mt-3" onClick={onSubmit}>Save</Button>
                </div>
            }
        </>
    );
}