import type { RefObject } from "react";
interface InputProps {
    placeholder: string;
    reference?: RefObject<HTMLInputElement>;
}

export function Input ({placeholder, reference}: InputProps){
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="w-full px-4 py-2 border border-gray-300 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
    </div>
}