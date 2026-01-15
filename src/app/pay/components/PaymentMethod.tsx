interface PaymentMethodProps {
    selectedMethod: string
    onSelect: (method: string) => void
}

export function PaymentMethod({
    selectedMethod,
    onSelect,
}: PaymentMethodProps) {
    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-400">
                <span className="material-symbols-outlined">payments</span>
                Phương thức thanh toán
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                <button
                    onClick={() => onSelect('cod')}
                    className={`relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                        selectedMethod === 'cod'
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-800 bg-gray-950 hover:border-gray-700'
                    }`}
                >
                    <div
                        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                            selectedMethod === 'cod'
                                ? 'border-blue-500'
                                : 'border-gray-600'
                        }`}
                    >
                        {selectedMethod === 'cod' && (
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            Thanh toán khi nhận hàng
                        </h3>
                        <p className="text-sm text-gray-400">
                            Thanh toán bằng tiền mặt khi shipper giao đến
                        </p>
                    </div>
                </button>

                <button
                    onClick={() => onSelect('banking')}
                    className={`relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                        selectedMethod === 'banking'
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-800 bg-gray-950 hover:border-gray-700'
                    }`}
                >
                    <div
                        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                            selectedMethod === 'banking'
                                ? 'border-blue-500'
                                : 'border-gray-600'
                        }`}
                    >
                        {selectedMethod === 'banking' && (
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            Chuyển khoản ngân hàng
                        </h3>
                        <p className="text-sm text-gray-400">
                            Quét mã VietQR (Cần xác nhận giao dịch)
                        </p>
                    </div>
                </button>
            </div>
        </div>
    )
}
