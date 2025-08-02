import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose}: {open: boolean, onClose: () => void }){
    // @ts-ignore
    const titleRef = useRef<HTMLInputElement>();
    // @ts-ignore
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(BACKEND_URL + "/api/v1/content", {
            link,
            type,
            title
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
                // "Authorization": `Bearer ${token}`
            }
        })
        onClose()

    }

    return <div>

        {open && <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col justify-center">
                <span className="bg-white p-4 rounded shadow-lg">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CloseIcon/>
                        </div>
                        
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <Input reference={titleRef} placeholder={"Title"}/>
                        <Input reference={linkRef} placeholder={"Link"}/>

                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-4 p-3">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube);
                                }}/>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}/>
                            </div>
                        </div>

                        <div className="flex justify-center -mt-3">
                            <Button onClick={addContent} variant="primary" text="Submit"/>
                        </div>
                        
                    </div>
                </span>
            </div>

        </div>}

    </div>
}

