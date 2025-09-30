import { FileText, Image } from "lucide-react";

interface attachProps {
    isOpen: boolean;
}

export default function AttachFile({isOpen} : attachProps){
    return(
        <div 
            onClick={(e) => e.stopPropagation()} 
            className={`
                absolute bottom-22 right-5 p-2 gap-2 h-auto w-45 flex justify-start flex-col bg-blue-200 z-40 rounded-lg
                ${isOpen ? 'flex': 'hidden'}`}>

                <div className="w-full px-1 h-8 bg-blue-300 flex justify-start items-center text-sm gap-1 rounded-sm">
                    <Image width={20}/>
                    <p>Image</p>
                </div>
                <div className="px-1 w-full h-8 bg-blue-300 flex justify-start items-center text-sm gap-1 rounded-sm">
                    <FileText width={20}/>
                    <p>Document</p>
                </div>
        </div>
    )
}