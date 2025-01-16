import { useEffect, useState } from "react";
import { Category, getCategory, getProducts, Product } from "../../api/store";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Link, useParams } from "react-router";
import LoadingError from "../../components/LoadingError";


export default function ProductList() {
    const { id } = useParams();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setLoading(true);
        setProducts([]);
        setCategory(null);
        setError("");

        getCategory(parseInt(id!))
            .then(c => {
                setCategory(c);
                return getProducts(c.id)
            })
            .then(p => setProducts(p))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    return <>
        <LoadingError loading={loading} error={error}></LoadingError>

        {
            category !== null && <>

                <h1 className="text-3xl font-bold">{category.name}</h1>

                {category.description && <Card className="mt-5">{category.description}</Card>}

            </>
        }


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-2">
            {
                products.map(p => <Card key={p.id} title={p.name}>
                    <p className="mb-3">{p.description}</p>
                    <Link to={`/store/product/${p.id}`}><Button variant="outlined">Order</Button></Link>
                </Card>)
            }
        </div>
    </>
}