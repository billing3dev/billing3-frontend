import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Stack from "../components/Stack";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import LoadingError from "../components/LoadingError";
import { register } from "../api/auth";
import { UserContext } from "../components/UserContext";
import Alert from "../components/Alert";

export default function Signup() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function onSubmit() {
        setLoading(true);
        setError("");
        setSuccess(false);
        register(email)
            .then(() => {
                setSuccess(true);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, [user, navigate]);

    if (user !== null) {
        return <></>
    }

    return <>
        <Stack className="max-w-md mx-auto p-3">

            <h1 className="text-3xl font-bold">Sign up</h1>

            {success && <Alert severity="success">An email has been sent to your address. Please check your inbox to complete the registration.</Alert>}

            <LoadingError loading={loading} error={error}></LoadingError>

            <Input label="Email" value={email} onChange={e => setEmail(e)}></Input>

            <Button disabled={loading} onClick={onSubmit}>Send email</Button>
            
            <Link to="/auth/signin" className="text-primary underline">Sign in</Link>

        </Stack >
    </>
}