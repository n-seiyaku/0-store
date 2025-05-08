'use client'

import { Box, Button, TextField } from '@mui/material'
import { useRef } from 'react'
import { POST } from '../api/login/route'
import { LoginData } from '@/src/types/LoginData'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Page() {
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const sx = {
        '& label': {
            color: '#A0AAB4',
        },
        '& label.Mui-focused': {
            color: '#A0AAB4',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#B2BAC2',
        },
        '& .MuiInputBase-input': {
            color: '#ffffff',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#E0E3E7',
            },
            '&:hover fieldset': {
                borderColor: '#B2BAC2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6F7E8C',
            },
        },
    }

    const login = async (request: LoginData) => {
        await POST(request)
            .then((res) => res.json())
            .then(
                (data) => (
                    localStorage.setItem('userData', JSON.stringify(data)),
                    router.push('/')
                ),
            )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formRef.current) {
            const formData = new FormData(formRef.current)
            const email = formData.get('email')?.toString()
            const password = formData.get('password')?.toString()

            const request: LoginData = {
                email: email || '',
                password: password || '',
            }

            login(request)
        }
    }

    return (
        <Box
            className="m-auto flex h-[calc(100vh-2rem)] w-1/3 flex-col items-center justify-center"
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
        >
            <h1 className="text-4xl">Login</h1>
            <TextField
                defaultValue="alice1234@example.com"
                label="Email"
                name="email"
                margin="normal"
                sx={sx}
            />
            <TextField
                defaultValue="123456"
                label="Password"
                name="password"
                type="password"
                margin="normal"
                sx={sx}
            />
            <Link
                className="mr-7 self-end text-sm hover:text-cyan-400"
                href="/register"
            >
                Or register here
            </Link>
            <Button type="submit" sx={{ mt: 2 }} variant="contained">
                Login
            </Button>
        </Box>
    )
}
