import { Paperclip } from "lucide-react";

export default function InputBar(){
    return(
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 py-3 px-3 bg-blue-200 rounded-2xl ml-3 mr-3 mb-4">
            <div className="flex-1 h-10 rounded-full bg-transparent">
                <input className="w-full h-full outline-none text-sm text-black placeholder:text-[rgb(68,68,68)] px-1" type="text" placeholder="Type your prompt here"/>
            </div>
            <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
                <Paperclip width={20}/>
            </button>
            <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
                <span className="text-sm">→</span>
            </button>
        </div>
    )
}