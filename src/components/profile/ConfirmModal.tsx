
interface ConfirmModalProps {
    message: string;
    alert?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ message, alert, onConfirm, onCancel }: ConfirmModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl p-6 w-[346px] h-[175px]">
                <p className="font-semibold text-[18px] ">{message}</p>
                {alert && <p className="mb-6 text-[14px] text-[#FF2D55] font-medium">{alert}</p>}
                <div className={`flex justify-around ${alert ? 'mt-8' : 'mt-12'}`}>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 w-[140px] h-[47px] bg-[#AAE8F5]/20 text-[16px]
                        text-[#00C0E8] font-semibold rounded-2xl hover:cursor-pointer hover:bg-[#D4F3F8]"
                    >
                        아니오
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 w-[140px] h-[47px] bg-[#00C0E8] text-[16px]
                        text-white font-semibold rounded-2xl hover:cursor-pointer hover:bg-[#00B3D8]"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
}