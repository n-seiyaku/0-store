interface PaymentMethodProps {
    selectedMethod: string
    onSelect: (method: string) => void
    // Hiển thị tùy chọn "Để anh trả" khi love-check thành công
    showLoveOption?: boolean
}

// Dữ liệu các phương thức thanh toán
const BASE_METHODS = [
    {
        id: 'cod',
        label: 'Thanh toán khi nhận hàng',
        description: 'Thanh toán bằng tiền mặt khi shipper giao đến',
    },
    {
        id: 'banking',
        label: 'Chuyển khoản ngân hàng',
        description: 'Quét mã VietQR (Cần xác nhận giao dịch)',
    },
]

const LOVE_METHOD = {
    id: 'love',
    label: 'Để anh trả',
    description: 'Anh sẽ thanh toán thay em, không cần lo gì hết',
}

export function PaymentMethod({
    selectedMethod,
    onSelect,
    showLoveOption = false,
}: PaymentMethodProps) {
    const methods = showLoveOption
        ? [...BASE_METHODS, LOVE_METHOD]
        : BASE_METHODS

    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-400">
                <span className="material-symbols-outlined">payments</span>
                Phương thức thanh toán
            </h2>

            {/* Grid container: khi có 3 card thì chuyển sang 3 cột */}
            <div
                className={`grid gap-4 transition-all duration-500 ${
                    showLoveOption ? 'md:grid-cols-3' : 'md:grid-cols-2'
                }`}
            >
                {methods.map((method) => {
                    const isLove = method.id === 'love'
                    const isSelected = selectedMethod === method.id

                    // Card love-option sẽ slide-in từ phải
                    const animationStyle =
                        isLove && showLoveOption
                            ? {
                                  animation:
                                      'slideInFromRight 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                              }
                            : undefined

                    return (
                        <button
                            key={method.id}
                            onClick={() => onSelect(method.id)}
                            style={animationStyle}
                            className={`relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                                isSelected
                                    ? isLove
                                        ? 'border-pink-500 bg-pink-500/10'
                                        : 'border-blue-500 bg-blue-500/10'
                                    : isLove
                                      ? 'border-pink-900/60 bg-gray-950 hover:border-pink-700'
                                      : 'border-gray-800 bg-gray-950 hover:border-gray-700'
                            }`}
                        >
                            {/* Radio dot */}
                            <div
                                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                    isSelected
                                        ? isLove
                                            ? 'border-pink-500'
                                            : 'border-blue-500'
                                        : 'border-gray-600'
                                }`}
                            >
                                {isSelected && (
                                    <div
                                        className={`h-2.5 w-2.5 rounded-full ${isLove ? 'bg-pink-500' : 'bg-blue-500'}`}
                                    />
                                )}
                            </div>

                            <div>
                                <h3
                                    className={`font-semibold ${isLove ? 'text-pink-300' : 'text-white'}`}
                                >
                                    {method.label}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {method.description}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Keyframe animation định nghĩa inline qua style tag */}
            <style>{`
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(40px) scale(0.96);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
            `}</style>
        </div>
    )
}
