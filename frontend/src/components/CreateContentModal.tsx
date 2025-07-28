import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";


export function CreateContentModal({open, onClose}: {open: boolean, onClose: () => void }){
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
                        <Input placeholder={"Title"} />
                        <Input placeholder={"Link"}/>
                        <div className="flex justify-center">
                            <Button variant="primary" text="Submit"/>
                        </div>
                        
                    </div>
                </span>
            </div>

        </div>}

    </div>
}

