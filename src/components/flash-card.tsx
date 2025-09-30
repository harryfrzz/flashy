import ControlCards from "./control-cards"
import OptionBubble from "./option-bubble"

export default function FlashCard(){
    return(
        <div className="w-full h-auto min-h-auto max-h-105 bg-blue-200 rounded-2xl mt-14 px-5 flex flex-col">
            <h1 className="text-2xl py-7 font-bold">Largest lake in india</h1>
            <p className="absolute top-27 right-10">1/10</p>

            <div className="flex flex-col gap-5">
                <div className="w-full h-12 rounded-lg bg-blue-300 flex justify-start items-center px-3 gap-2">
                    <OptionBubble optionStr={"A"}/>
                    <p>Lorem</p>
                </div>
                <div className="w-full h-12 rounded-lg bg-blue-300 flex justify-start items-center px-3 gap-2">
                    <OptionBubble optionStr={"B"}/>
                    <p>Ipsum</p>
                </div>
                
                <div className="w-full h-12 rounded-lg bg-blue-300 flex justify-start items-center px-3 gap-2">
                    <OptionBubble optionStr={"C"}/>
                    <p>Dolor</p>
                </div>
                <div className="w-full h-12 min-h-12 max-h-16 rounded-lg bg-blue-300 flex justify-start items-center px-3 gap-2">
                    <OptionBubble optionStr={"A"}/>
                    <p>Something</p>
                </div>
            </div>
            <ControlCards/>
        </div>
        
    )
}