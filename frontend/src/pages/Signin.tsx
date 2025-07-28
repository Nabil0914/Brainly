import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin(){
    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 px-8 py-10">
            <Input placeholder="username"/>
            <Input placeholder="password"/>

            <div className="flex justify-center items-center pt-2">
                <Button loading={false} fullWidth={true} variant="primary" text="Signin" />
            </div>
        </div>
    </div>
}