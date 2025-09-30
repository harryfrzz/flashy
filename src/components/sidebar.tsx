
import { PanelRight, Settings, SquarePen } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="w-[500px] h-[600px] fixed inset-0 bg-black opacity-20 z-20"
                    onClick={onClose}
                />
            )}  
            <div className={`
                fixed top-0 left-0 p-2 gap-2 h-[600px] flex justify-start flex-col w-64 bg-blue-100 z-50 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                
                <div className="w-full flex justify-between bg-transparent rounded-md px-1 mt-2">
                    <h1 className=" text-black text-lg">Flashy</h1>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-300"
                    >
                        <PanelRight size={23} color="black"/>
                    </button>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                    <div className="w-full h-10 bg-blue-200 flex justify-start items-center gap-2 px-2 rounded-lg">
                        <SquarePen width={18}/>
                        <p className="text-sm">New Flashcard</p>
                    </div>
                    <div className="w-full h-10 bg-blue-200 flex justify-start items-center gap-2 px-2 rounded-lg">
                        <Settings width={18}/>
                        <p className="text-sm">Settings</p>
                    </div>
                    <h1 className="px-1 text-sm">History</h1>
                </div>
                

            </div>
        </>
    );
}