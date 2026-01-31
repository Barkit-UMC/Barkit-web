type ToggleSwitchProps = {
    isOn: boolean;
    onToggle: () => void;
};

export default function ToggleSwitch({isOn, onToggle}: ToggleSwitchProps) {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
            className={`
                w-[46px] h-[26px] rounded-full
                cursor-pointer transition-colors duration-300
                ${isOn ? 'bg-green-500' : 'bg-gray-300'}
                relative
            `}
        >
            <div
                className={`
                    absolute top-1/2 -translate-y-1/2
                    w-[20px] h-[20px] bg-white rounded-full shadow-sm
                    transform transition-transform duration-300
                    ${isOn ? 'translate-x-[22px]' : 'translate-x-[4px]'}
                `}
            />
        </div>
    );
}