export function Input ({onChange, placeholder}: {onChange: () => void, placeholder: string}){
    return <div>
        <input placeholder={placeholder} type={"text"} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
    </div>
}