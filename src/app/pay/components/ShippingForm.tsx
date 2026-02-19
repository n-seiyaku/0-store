interface ShippingInfo {
    address: string
    note: string
}

interface ShippingFormProps {
    value: ShippingInfo
    onChange: (info: ShippingInfo) => void
    // Errors for each field, passed from parent
    errors?: Partial<Record<keyof ShippingInfo, string>>
    // Clear a specific field error when user starts typing
    onClearError?: (field: keyof ShippingInfo) => void
}

export function ShippingForm({
    value,
    onChange,
    errors = {},
    onClearError,
}: ShippingFormProps) {
    const handleChange = (field: keyof ShippingInfo, val: string) => {
        onChange({ ...value, [field]: val })
        // Clear error when user types
        if (errors[field]) onClearError?.(field)
    }

    // Returns border classes based on error state
    const inputClass = (field: keyof ShippingInfo) =>
        `w-full rounded-xl border bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-all focus:outline-none ${
            errors[field]
                ? 'border-red-500 ring-1 ring-red-500/50 focus:border-red-400 focus:ring-red-400/50'
                : 'border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        }`

    return (
        <div
            className={`rounded-2xl border bg-gray-900/50 p-6 transition-colors ${
                errors.address ? 'border-red-500/40' : 'border-gray-800'
            }`}
        >
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-400">
                <span className="material-symbols-outlined">
                    local_shipping
                </span>
                Giao hàng
            </h2>
            <div className="space-y-4">
                {/* Address */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-400">
                        Địa chỉ cụ thể
                        <span className="ml-1 text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={value.address}
                        onChange={(e) =>
                            handleChange('address', e.target.value)
                        }
                        placeholder="Số 1, đường ABC, Phường XYZ"
                        className={inputClass('address')}
                    />
                    {errors.address && (
                        <p className="flex items-center gap-1 text-xs text-red-400">
                            <span className="material-symbols-outlined text-sm">
                                error
                            </span>
                            {errors.address}
                        </p>
                    )}
                </div>

                {/* Note */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-400">
                        Ghi chú giao hàng
                    </label>
                    <textarea
                        rows={3}
                        value={value.note}
                        onChange={(e) => handleChange('note', e.target.value)}
                        placeholder="Ví dụ: Gọi trước khi giao, giao giờ hành chính..."
                        className={inputClass('note')}
                    />
                </div>
            </div>
        </div>
    )
}
