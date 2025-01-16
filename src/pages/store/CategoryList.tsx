import { useEffect, useState } from "react";
import { Category, getCategories } from "../../api/store";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Link } from "react-router";


export default function CategoryList() {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then(c => setCategories(c))
            .catch(e => console.error(e));
    }, []);

    return <>
        <h1 className="text-3xl font-bold">Store</h1>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-2">
            {
                categories.map(c => <Card key={c.id} title={c.name}>
                    <p className="mb-3">{c.description}</p>
                    <Link to={`/store/${c.id}`}><Button variant="outlined">View Products</Button></Link>
                </Card>)
            }
        </div>
    </>
}