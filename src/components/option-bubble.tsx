export default function OptionBubble({optionStr}: {optionStr: String}){
    return(
        <div className="w-5 h-5 rounded-full bg-white flex justify-center items-center">
            <p className="text-sm">{optionStr}</p>
        </div>
    )
}