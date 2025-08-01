import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    //@ts-ignore
    const usernameRef = useRef<HTMLInputElement>();
    //@ts-ignore
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username,
            password
        })

        navigate('/signin')
        alert("You are successfully signed up !!");
    }



    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 px-8 py-10">
            <Input reference={usernameRef} placeholder="username"/>
            <Input reference={passwordRef} placeholder="password"/>

            <div className="flex justify-center items-center pt-2">
                <Button onClick={signup} loading={false} fullWidth={true} variant="primary" text="Signup" />
            </div>
        </div>
    </div>
}