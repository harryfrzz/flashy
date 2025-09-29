import { PanelRight } from "lucide-react";
interface TopbarProps {
    onOpenSidebar: () => void;
}

export default function Topbar({ onOpenSidebar }: TopbarProps){
    return(
        <div className="fixed top-1.5 w-full h-15 p-5 flex justify-between items-center">
            <div onClick={onOpenSidebar} className="flex justify-start gap-5 cursor-pointer hover:opacity-75">
                <PanelRight color="black" width={26} height={26}/>
                <h1 className="text-xl">Flashy</h1>
            </div>
        </div>
    )
}