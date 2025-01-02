import { useState } from "react";
import Input from "../components/Input";
import Stack from "../components/Stack";
import Button from "../components/Button";
import { Link } from "react-router";
import LoadingError from "../components/LoadingError";

export default function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");

    return <>
        <Stack className="max-w-md mx-auto p-3">

            <h1 className="text-3xl font-bold">Sign in</h1>

            <LoadingError loading={true} error="error error error error error error error error error error error error error error error error error error     "></LoadingError>

            <Input label="Email" value={email} onChange={e => setEmail(e)}></Input>
            <Input label="Password" type="password" value={password} onChange={e => setPasswrod(e)}></Input>
            <Link to="/auth/reset-password" className="text-primary underline">Forget password</Link>

            <Button>Sign in</Button>
            <Button variant="outlined">Sign up</Button>

        </Stack>
    </>
}