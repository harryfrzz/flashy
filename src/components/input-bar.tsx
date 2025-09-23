import { Paperclip } from "lucide-react";

export default function InputBar(){
    return(
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 py-5 px-3 bg-transparent">
            <div className="flex-1 h-10 rounded-full bg-white">
                <input className="w-full h-full px-3 outline-none text-sm rounded-full" type="text" placeholder="Type your prompt here"/>
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