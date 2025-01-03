import { Link } from "react-router";


export function NotFound() {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl">404 Not Found</h1>
            <Link className="underline text-primary" to={"/"}>Home</Link>
        </div>
    );
}