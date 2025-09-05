'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { useEffect, useRef, useState } from 'react'
import { Text } from '../text'
import { Textarea } from '../textarea'
import { sub } from 'framer-motion/client'
import { encrypt } from '@/utils/cryptography'
import { fetchData } from '@/utils/api'

type SignupState = 'Sign in' | 'Signing in...'

export function SigninForm(p: {
    'data-organization': {
        theme: {
            brand: string
            accent: string
            dark: string
            light: string
        }
    }
    label: SignupState
}) {
    const loginBtnRef = useRef<HTMLButtonElement>(null)
    let [payload, setPayload] = useState<Record<string, string>>({})
    let [isOpen, setIsOpen] = useState(false)
    let [submitAction, setSubmitAction] = useState<SignupState>(p.label)

    return (
        <>
            <Button type="button" color={p['data-organization'].theme.brand as any} onClick={() => setIsOpen(true)}>
                {p.label} &rarr;
            </Button>
            <Dialog open={isOpen} onClose={setIsOpen} size='xs'>
                <DialogTitle>Sign in</DialogTitle>
                <DialogBody>
                    <Fieldset>
                        <FieldGroup>
                        
                            <Field>
                                <Label>Email address</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && payload.email && payload.password) {
                                            loginBtnRef.current?.click()
                                        }
                                    }}
                                />
                            </Field>
                            
                            <Field>
                                <Label>Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && payload.email && payload.password) {
                                            loginBtnRef.current?.click()
                                        }
                                    }}
                                />
                            </Field>
                        
                        </FieldGroup>
                    </Fieldset>
                    
                </DialogBody>
                <DialogActions>
                    <Button
                    ref={loginBtnRef}
                        disabled={submitAction === 'Signing in...'}
                        onClick={() => {
                            setSubmitAction('Signing in...')
                            fetchData('/api/auth', { method: 'PUT' }, payload).then(d => {
                                const { user, message } = d as {
                                    user?: Record<string, string>
                                    message?: string
                                }
                                if (user) {
                                    for (const key in user) {
                                        if (user[key]) {
                                            localStorage.setItem(key, typeof user[key] === 'object' ? JSON.stringify(user[key]) : user[key])
                                        } else {
                                            localStorage.removeItem(key)
                                        }
                                    }
                                    // Handle successful sign-in

                                    setTimeout(() => {
                                        location.href = '/my'
                                    }, 200)
                                } else {
                                    // Handle sign-in error
                                }
                            }).finally(() => {
                                setSubmitAction('Sign in')
                            })
                        }}
                        color={p['data-organization'].theme.brand as any}
                        className="min-w-32"
                    >
                        {submitAction}
                        {submitAction === 'Signing in...' ? '' : <> &rarr;</>}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
