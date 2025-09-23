import { PanelRight } from "lucide-react";
import RecordBtn from "./record-btn";

interface TopbarProps {
    onOpenSidebar: () => void;
}

export default function Topbar({ onOpenSidebar }: TopbarProps){
    return(
        <div className="w-full h-15 p-5 flex justify-between items-center">
            <div onClick={onOpenSidebar} className="flex justify-start gap-5 cursor-pointer hover:opacity-75">
                <PanelRight color="white" width={28} height={28}/>
            </div>
            <RecordBtn/>
        </div>
    )
}