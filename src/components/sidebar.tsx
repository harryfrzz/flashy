
import { PanelRight, X } from "lucide-react";

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
                    className="w-[500px] h-[600px] fixed inset-0 bg-black opacity-50 z-40"
                    onClick={onClose}
                />
            )}
            <div className={`
                fixed top-0 left-0 p-2 gap-2 h-[600px] flex justify-between flex-col w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
               
            <button 
                onClick={onClose}
                className="text-white hover:text-gray-300 absolute top-5 right-5"
            >
                <PanelRight size={24} color="black"/>
            </button>

                <div className="w-full h-full bg-white rounded-md">

                </div>
                <div className="w-full bg-white h-15 rounded-md">

                </div>
            </div>
        </>
    );
}