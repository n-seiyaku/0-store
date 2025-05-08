import { RegisterData } from '@/src/types/RegisterData'

export async function POST(request: RegisterData) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
        const res = await fetch(apiUrl + '/users', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name: request.name,
                email: request.email,
                password: request.password,
            }),
        })

        return res
    } catch (error) {
        console.log(error)
    }
}
