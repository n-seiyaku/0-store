interface ContactInfo {
    name: string
    phone: string
    email: string
}

interface ContactFormProps {
    value: ContactInfo
    onChange: (info: ContactInfo) => void
}

export function ContactForm({ value, onChange }: ContactFormProps) {
    const handleChange = (field: keyof ContactInfo, val: string) => {
        onChange({ ...value, [field]: val })
    }

    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-400">
                <span className="material-symbols-outlined">contact_mail</span>
                Thông tin liên hệ
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        value={value.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        value={value.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-400">
                        Email (Tùy chọn)
                    </label>
                    <input
                        type="email"
                        value={value.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="email@example.com"
                        className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    )
}
