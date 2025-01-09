import { useEffect, useState } from "react";
import { Category, getCategories } from "../../../api/admin-category";
import { ProductEdit as ApiProductEdit, createProduct, getExtensions } from "../../../api/admin-product";
import LoadingError from "../../../components/LoadingError";
import Form from "./Form";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";

export default function ProductAdd() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState<ApiProductEdit>({
        name: "",
        description: "",
        category_id: 0,
        extension: "None",
        enabled: false,
        pricing: [
            { display_name: "Monthly", duration: 2592000, price: "0.00", setup_fee: "0.00" }
        ],
        settings: {},
        stock: 0,
        stock_control: 1,
        options: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [extensions, setExtensions] = useState<string[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setCategories([]);

        getCategories()
            .then((data) => {
                setCategories(data)
                return getExtensions();
            })
            .then((data) => setExtensions(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    function onSubmit() {
        setLoading(true);
        setError("");
        createProduct(product)
            .then(() => {
                navigate("/admin/product");
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }

    return <>
        <h1 className="text-3xl font-bold">Add Product</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <Form product={product} categories={categories} onChange={setProduct} extensions={extensions}></Form>

        <Button className="mt-5" onClick={onSubmit}>Save</Button>
    </>
}