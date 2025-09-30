export default function OptionBubble({optionStr}: {optionStr: String}){
    return(
        <div className="w-5 h-5 rounded-full bg-blue-50 flex justify-center items-center">
            <p className="text-sm">{optionStr}</p>
        </div>
    )
}