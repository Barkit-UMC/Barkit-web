
interface ConfirmModalProps {
    message: string;
    alert?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ message, alert, onConfirm, onCancel }: ConfirmModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl p-6 w-[346px]">
                <p className="font-semibold text-[18px] mb-2 mt-3">{message}</p>
                {alert && <p className="mb-6 text-[14px] text-red-500 font-semibold">{alert}</p>}
                <div className="flex justify-around pt-8">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 w-[140px] h-[47px] bg-[#AAE8F5]/20
                        text-[#00C0E8] font-semibold rounded-2xl hover:cursor-pointer"
                    >
                        아니오
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 w-[140px] h-[47px] bg-[#00C0E8]
                        text-white font-semibold rounded-2xl hover:cursor-pointer"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
}