import { NextResponse, after } from 'next/server'
import { OpenRouter } from '@openrouter/sdk'
import { getAllSentences, storeLoveSentence } from '@/src/lib/loveSentenceStore'
import camelcaseKeys from 'camelcase-keys'

export async function POST(req: Request) {
    const { sentence } = await req.json()

    if (!sentence || typeof sentence !== 'string') {
        return NextResponse.json({ error: 'Invalid sentence' }, { status: 400 })
    }

    const res = await getAllSentences(sentence)

    if (res !== undefined && res.length !== 0) {
        return NextResponse.json({
            isLovingCaring: false,
            reason: 'Mã này xài rồi! Đổi mã khác đi',
            reasonSummary: 'Mã này xài rồi! Đổi mã khác đi',
        })
    }

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
        return NextResponse.json(
            { error: 'OPENROUTER_API_KEY not found' },
            { status: 500 },
        )
    }

    try {
        const openRouter = new OpenRouter({ apiKey: apiKey })
        const response = await openRouter.chat.send({
            model: 'xiaomi/mimo-v2-flash:free',
            messages: [
                {
                    role: 'user',
                    content: `
                        Bạn là kiểm soát viên nghiêm ngặt về cảm xúc.
                        Nhiệm vụ: Xác định đây có phải là lời nói yêu thương của nữ giới trong tình yêu không.

                        Quy tắc BẮT BUỘC để (is_loving_caring: true):
                        - Nội dung phải thể hiện tình cảm, quan tâm rõ ràng.
                        - Chấp nhận các kiểu viết tắt/biết sai thông thường trong ngôn ngữ mạng nhưng vẫn mang ý nghĩa

                        TRẢ VỀ FALSE (is_loving_caring: false) NGAY LẬP TỨC NẾU:
                        - Có ký tự thừa vô nghĩa.
                        
                        Trả về JSON duy nhất: { "is_loving_caring": boolean, "reason": "Giải thích", "reason_summary": "Tóm tắt lý do" }
                        
                        Câu cần kiểm tra: "${sentence}"`,
                },
            ],
            stream: false,
        })

        const result = response.choices[0]?.message?.content

        if (typeof result === 'string') {
            const cleanText = result.replace(/```json|```/g, '').trim()
            const data = JSON.parse(cleanText)

            // Store data in logic in the background to speed up response
            after(async () => {
                await storeLoveSentence(
                    sentence,
                    data.is_loving_caring,
                    data.reason,
                )
            })

            return NextResponse.json(camelcaseKeys(data, { deep: true }))
        }

        return NextResponse.json(
            { error: 'Failed to classify sentence' },
            { status: 500 },
        )
    } catch (error) {
        console.error('Gemini API Error:', error)
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to classify sentence',
            },
            { status: 500 },
        )
    }
}
