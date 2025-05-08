import { LoginData } from '@/src/types/LoginData'

export async function POST(request: LoginData) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const res = await fetch(apiUrl + '/users/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email: request.email,
            password: request.password,
        }),
    })

    return res
}
