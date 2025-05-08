'use client'

import { ColorStatus } from '@/src/types/ColorStatus'
import { Box, Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { POST } from '../api/register/route'
import { useRouter } from 'next/navigation'

function Page() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [nameStatus, setNameStatus] = useState<ColorStatus>('normal')
    const [emailStatus, setEmailStatus] = useState<ColorStatus>('normal')
    const [passwordStatus, setPasswordStatus] = useState<ColorStatus>('normal')
    const [emailErrorMessage, setEmailErrorMessage] = useState(
        'Invalid email format',
    )
    const [rePasswordStatus, setRePasswordStatus] =
        useState<ColorStatus>('normal')
    const router = useRouter()

    const changeStatusColor = (status: ColorStatus) => {
        const errorColor = '#e80017'
        const successColor = '#00c853'

        const baseSx = {
            width: 'calc(100% - 5rem)',
            '& label': { color: '#A0AAB4' },
            '& label.Mui-focused': { color: '#A0AAB4' },
            '& .MuiInput-underline:after': { borderBottomColor: '#B2BAC2' },
            '& .MuiInputBase-input': { color: '#ffffff' },
            '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#E0E3E7' },
                '&:hover fieldset': { borderColor: '#B2BAC2' },
                '&.Mui-focused fieldset': { borderColor: '#6F7E8C' },
            },
            '& .MuiFormHelperText-root': { marginLeft: '0' },
        }

        const statusStyles = {
            normal: {},
            success: {
                '& label': { color: successColor },
                '& label.Mui-focused': { color: successColor },
                '& .MuiInputBase-input': { color: successColor },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: successColor },
                    '&:hover fieldset': { borderColor: successColor },
                    '&.Mui-focused fieldset': { borderColor: successColor },
                },
                '& .MuiFormHelperText-root': { color: successColor },
            },
            error: {
                '& label': { color: errorColor },
                '& label.Mui-focused': { color: errorColor },
                '& .MuiInputBase-input': { color: errorColor },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: errorColor },
                    '&:hover fieldset': { borderColor: errorColor },
                    '&.Mui-focused fieldset': { borderColor: errorColor },
                },
                '& .MuiFormHelperText-root': { color: errorColor },
            },
        }

        return { ...baseSx, ...statusStyles[status] }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const request = {
            name: name,
            email: email,
            password: password,
        }
        try {
            const res = await POST(request)
            const data = await res!.json()

            if (res!.status === 201) {
                localStorage.setItem('userData', JSON.stringify(data)),
                    router.push('/')
            } else if (res!.status === 400) {
                setEmailErrorMessage(
                    data.message || 'An error occurred. Please try again.',
                )
                setEmailStatus('error')
            } else {
                setEmailErrorMessage(
                    'Unexpected error. Please try again later.',
                )
            }
        } catch (error) {
            console.error('Error during registration:', error)
        }
    }

    const checkValidPassword = (password: string): boolean => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=(){}])[A-Za-z\d@$!%*?&=(){}]{8,}$/
        return passwordRegex.test(password)
    }

    const checkValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }
    useEffect(() => {
        setNameStatus(name ? 'success' : 'normal')
    }, [name])

    useEffect(() => {
        if (email === '') {
            setEmailStatus('normal')
            return
        }

        setEmailStatus(checkValidEmail(email) ? 'success' : 'error')
    }, [email])

    useEffect(() => {
        if (password === '') {
            setPasswordStatus('normal')
            setIsValidPassword(true)
            return
        }

        const isValid = checkValidPassword(password)
        setIsValidPassword(isValid)
        setPasswordStatus(isValid ? 'success' : 'error')
    }, [password])

    useEffect(() => {
        if (rePassword === '') {
            setRePasswordStatus('normal')
            return
        }

        const isMatch = password === rePassword && password !== ''
        setIsPasswordMatch(isMatch)
        setRePasswordStatus(isMatch ? 'success' : 'error')
    }, [password, rePassword])

    return (
        <Box
            className="m-auto flex h-[calc(100vh-2rem)] w-1/2 flex-col items-center justify-center"
            component="form"
            onSubmit={handleSubmit}
        >
            <h1 className="text-4xl">Register</h1>
            <TextField
                required
                label="Name"
                name="name"
                margin="normal"
                sx={changeStatusColor(nameStatus)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
            />
            <TextField
                required
                label="Email"
                name="email"
                margin="normal"
                sx={changeStatusColor(emailStatus)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                helperText={emailStatus === 'error' ? emailErrorMessage : ''}
            />
            <TextField
                required
                label="Password"
                name="password"
                type="password"
                margin="normal"
                value={password}
                sx={changeStatusColor(passwordStatus)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                helperText={
                    !isValidPassword
                        ? 'Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.'
                        : ''
                }
            />
            <TextField
                required
                label="Re-enter password"
                name="rePassword"
                type="password"
                margin="normal"
                value={rePassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRePassword(e.target.value)
                }
                sx={changeStatusColor(rePasswordStatus)}
                helperText={!isPasswordMatch ? 'Passwords do not match' : ''}
            />
            <Link
                className="mr-7 self-end text-sm hover:text-cyan-400"
                href="/login"
            >
                Or login here
            </Link>
            <Button type="submit" sx={{ mt: 2 }} variant="contained">
                Register
            </Button>
        </Box>
    )
}

export default Page
