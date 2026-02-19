interface ContactInfo {
    name: string
    phone: string
    email: string
}

interface ContactFormProps {
    value: ContactInfo
    onChange: (info: ContactInfo) => void
    // Errors for each field, passed from parent
    errors?: Partial<Record<keyof ContactInfo, string>>
    // Clear a specific field error when user starts typing
    onClearError?: (field: keyof ContactInfo) => void
}

export function ContactForm({
    value,
    onChange,
    errors = {},
    onClearError,
}: ContactFormProps) {
    const handleChange = (field: keyof ContactInfo, val: string) => {
        onChange({ ...value, [field]: val })
        // Clear error when user types
        if (errors[field]) onClearError?.(field)
    }

    // Returns border classes based on error state
    const inputClass = (field: keyof ContactInfo) =>
        `w-full rounded-xl border bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-all focus:outline-none ${
            errors[field]
                ? 'border-red-500 ring-1 ring-red-500/50 focus:border-red-400 focus:ring-red-400/50'
                : 'border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        }`

    return (
        <div
            className={`rounded-2xl border bg-gray-900/50 p-6 transition-colors ${
                errors.name || errors.phone
                    ? 'border-red-500/40'
                    : 'border-gray-800'
            }`}
        >
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-400">
                <span className="material-symbols-outlined">contact_mail</span>
                Thông tin liên hệ
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-400">
                        Họ và tên
                        <span className="ml-1 text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={value.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className={inputClass('name')}
                    />
                    {errors.name && (
                        <p className="flex items-center gap-1 text-xs text-red-400">
                            <span className="material-symbols-outlined text-sm">
                                error
                            </span>
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-400">
                        Số điện thoại
                        <span className="ml-1 text-red-400">*</span>
                    </label>
                    <input
                        type="tel"
                        value={value.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="0912 345 678"
                        className={inputClass('phone')}
                    />
                    {errors.phone && (
                        <p className="flex items-center gap-1 text-xs text-red-400">
                            <span className="material-symbols-outlined text-sm">
                                error
                            </span>
                            {errors.phone}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-400">
                        Email (Tùy chọn)
                    </label>
                    <input
                        type="email"
                        value={value.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="email@example.com"
                        className={inputClass('email')}
                    />
                    {errors.email && (
                        <p className="flex items-center gap-1 text-xs text-red-400">
                            <span className="material-symbols-outlined text-sm">
                                error
                            </span>
                            {errors.email}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
