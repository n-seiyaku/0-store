interface ShippingInfo {
    address: string
    note: string
}

interface ShippingFormProps {
    value: ShippingInfo
    onChange: (info: ShippingInfo) => void
}

export function ShippingForm({ value, onChange }: ShippingFormProps) {
    const handleChange = (field: keyof ShippingInfo, val: string) => {
        onChange({ ...value, [field]: val })
    }

    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-400">
                <span className="material-symbols-outlined">
                    local_shipping
                </span>
                Giao hàng
            </h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">
                        Địa chỉ cụ thể
                    </label>
                    <input
                        type="text"
                        value={value.address}
                        onChange={(e) =>
                            handleChange('address', e.target.value)
                        }
                        placeholder="Số 1, đường ABC, Phường XYZ"
                        className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">
                        Ghi chú giao hàng
                    </label>
                    <textarea
                        rows={3}
                        value={value.note}
                        onChange={(e) => handleChange('note', e.target.value)}
                        placeholder="Ví dụ: Gọi trước khi giao, giao giờ hành chính..."
                        className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    )
}
