'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { useState } from 'react'
import { Text } from '../text'

type SignupState = 'Sign up' | 'Signing up...' | 'Go to dashboard'

export function OrganizationSignupForm(p: {
    'data-organization': {
        theme: {
            brand: string
            accent: string
            dark: string
            light: string
        }
    }
}) {
    let [payload, setPayload] = useState<Record<string, string>>({})
    let [isOpen, setIsOpen] = useState(false)
    let [submitAction, setSubmitAction] = useState<SignupState>('Sign up')

    function submitForm() {
        const errors: string[] = []
        if (!payload.email) errors.push('Email is required.')
        if (!payload.phone) errors.push('Phone number is required.')
        if (!payload.password) errors.push('Password is required.')
        if (!payload.password_confirmation || payload.password_confirmation !== payload.password) errors.push('Please re-enter the same password for confirmation.')
        if (!payload.name) errors.push('Organization name is required.')
        if (!payload.first_name) errors.push('First name is required.')
        if (!payload.last_name) errors.push('Last name is required.')
        if (!payload.street_address) errors.push('Street address is required.')
        if (!payload.postal_code) errors.push('Postal code is required.')

        if (errors.length) {
            alert(errors.join('\n'))
            return
        }

        if (submitAction) {
            
                setSubmitAction('Signing up...')
                fetch('/api/auth/organization', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                }).then(res => res.json()).then(d => {
                    const { access_token, record } = d;
                    if (access_token) {
                        localStorage.setItem('access_token', access_token);
                        localStorage.setItem('email', record.email);
                        localStorage.setItem('first_name', record.first_name);
                        localStorage.setItem('phone', record.phone);
                        setSubmitAction('Go to dashboard')
                    } else {
                        const error_tokens = d.message.toLowerCase().split(' ').map((w: string) => w.toLowerCase())
                        if (error_tokens.includes('duplicate')) {
                            if (d.message.includes('users_pkey'))
                                alert('You may have already signed up with this email or phone number.\n\nTry logging in instead.')
                            else
                                alert('An organization with this email or phone number already exists.')
                        } else
                        alert(d.message || 'An error occurred. Please try again.')
                        setSubmitAction('Sign up')
                    }
                }).catch(() => {
                    setSubmitAction('Sign up')
                })
        }
    }

    return (
        <>
            <Button type="button" color={p['data-organization'].theme.brand as any} onClick={() => setIsOpen(true)}>
                Sign up now
            </Button>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>Sign up</DialogTitle>
                <DialogBody>
                    <Fieldset>
                        <Legend>Organization account details</Legend>
                        <Text>
                            Please enter your organization's email address, phone number, and account password below.
                            <br />
                            This is important for account verification, access to schedules, and communication.
                        </Text>
                        <FieldGroup>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                                <Field>
                                    <Label>Email address</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <Field>
                                    <Label>Phone number</Label>
                                    <Input type="tel" name="phone" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                                </Field>
                                <Field>
                                    <Label>Password</Label>
                                    <Input
                                        name="password"
                                        type="password"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <Field>
                                    <Label>Re-enter password</Label>
                                    <Input
                                        name="password_confirmation"
                                        type="password"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                            </div>
                        </FieldGroup>
                    </Fieldset>
                    <Fieldset className='mt-14'>
                        <Legend>Organization business details</Legend>
                        <Text>
                            Please enter your organization's business information below.
                        </Text>
                        <FieldGroup>
                            <Field className="sm:col-span-2">
                                <Label>Name of your organization</Label>
                                <Input name="name" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                            </Field>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                                <Field>
                                    <Label>First name</Label>
                                    <Input
                                        name="first_name"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <Field>
                                    <Label>Last name</Label>
                                    <Input
                                        name="last_name"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                                <Field className="sm:col-span-2">
                                    <Label>Street address</Label>
                                    <Input name="street_address" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                                </Field>

                                <Field>
                                    <Label>Postal code</Label>
                                    <Input name="postal_code" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                                </Field>
                            </div>
                        </FieldGroup>
                    </Fieldset>
                </DialogBody>
                <DialogActions>
                    <div className="grow">
                        <Button color='white' onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </div>

                    <Button
                        disabled={submitAction === 'Signing up...'}
                        onClick={() => submitForm()}
                        color={p['data-organization'].theme.brand as any}
                        className="min-w-32"
                    >
                        {submitAction}
                        {submitAction === 'Signing up...' ? '' : <> &rarr;</>}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
