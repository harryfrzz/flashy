import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ControlCards(){
    return(
        <div className="flex w-full h-14 justify-end items-center gap-5">
            <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
                <ChevronLeft/>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
                <ChevronRight/>
            </div>
        </div>
    )
}