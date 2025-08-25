'use client';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import { Field, FieldGroup, Fieldset, Label, Legend } from '../fieldset';
import { Input } from '../input';

export default function ParentInformationSection({
	'data-theme': theme,
    'data-focus': focus,
	setFormData,
	formData,
    setFocus,
	setStep,
    'data-show': show = false,
}: {
	setFormData(data: Record<string, any>): void;
	formData: Record<string, any>;
	setFocus(name: string): void;
	setStep(s: number): void;
    'data-focus': string;
	'data-theme'?: 'light' | 'dark';
    'data-show'?: boolean;
}) {
	const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string[]>([]);
    const phoneRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (show) {
            if (focus === 'phone' && phoneRef.current) {
                phoneRef.current.focus();
            } else if (focus === 'email' && emailRef.current) {
                emailRef.current.focus();
            } else if (focus === 'first_name' && firstNameRef.current) {
                firstNameRef.current.focus();
            } else if (focus === 'last_name' && lastNameRef.current) {
                lastNameRef.current.focus();
            }
        }
    }, [focus, show]);

    

    function signUp(member_id: number) {
        fetch('/api/account/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                season_membership_payments_id: member_id,
                fees: formData.fees || {},
                total: formData.total || 0,
            }),
        })
            .then(async (planRes) => {
                if (planRes.ok) {
                    const planData = await planRes.json();
                    setMessage([
                        'Registration successful!',
                        'We will be in touch via text message soon.',
                        `Enrolled in ${planData.programs.length} program(s).`,
                    ]);
                } else {
                    const errorPlanData = await planRes.json();
                    console.error('Plan fetch failed:', errorPlanData);
                }
            })
            .catch((error) => {
                console.error('Error fetching plans:', error);
            });
    }

	return (
		<>
			<div className={`${show ? 'sm:grid grid-cols-4 gap-6 m-6 sm:mx-0' : 'hidden'}`}>
                <Field className={`col-span-2 col-start-1 ${focus === 'phone' ? 'block' : 'hidden sm:block'}`}>
                    <Label data-theme={theme}>Phone number</Label>
                    <Input
                        ref={phoneRef}
                        id="phone-number"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        data-theme={theme}
                        defaultValue={formData.phone}
                        onChange={(e) => {
                            setFormData((prev: Record<string, any>) => ({
                                ...prev,
                                [e.target.name]: e.target.value.trim(),
                            }));
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setFocus('email');
                                if (emailRef.current) {
                                    emailRef.current.focus();
                                }
                            }
                        }}
                        placeholder='Enter mobile number'
                    />
                </Field>
                <Field className={`col-span-4 col-start-1 ${focus === 'email' ? 'block' : 'hidden sm:block'}`}>
                    <Label data-theme={theme}>Email</Label>
                    <Input
                        ref={emailRef}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        data-theme={theme}
                        defaultValue={formData.email}
                        onChange={(e) => {
                            setFormData((prev: Record<string, any>) => ({
                                ...prev,
                                [e.target.name]: e.target.value.trim(),
                            }));
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setFocus('first_name');
                                if (firstNameRef.current) {
                                    firstNameRef.current.focus();
                                }
                            }
                        }}
                        placeholder='Enter your email'
                    />
                </Field>
                <div className='hidden sm:block col-span-2 col-start-3' />
                <Field className={`sm:col-span-2 col-start-1 col-ends-2 ${focus === 'first_name' ? 'block' : 'hidden sm:block'}`}>
                    <Label data-theme={theme}>First name (parent/guardian)</Label>
                    <Input
                        ref={firstNameRef}
                        id="first-name"
                        name="first_name"
                        type="text"
                        autoComplete="name"
                        data-theme={theme}
                        defaultValue={formData.first_name}
                        onChange={(e) => {
                            setFormData((prev: Record<string, any>) => ({
                                ...prev,
                                [e.target.name]: e.target.value.trim(),
                            }));
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setFocus('last_name');
                                if (lastNameRef.current) {
                                    lastNameRef.current.focus();
                                }
                            }
                        }}
                        placeholder='Enter your first name'
                    />
                </Field>
                <Field className={`sm:col-span-2 col-start-3 col-ends-4 ${focus === 'last_name' ? 'block' : 'hidden sm:block'}`}>
                    <Label data-theme={theme}>Last name (parent/guardian)</Label>
                    <Input
                        ref={lastNameRef}
                        id="last-name"
                        name="last_name"
                        type="text"
                        autoComplete="family-name"
                        data-theme={theme}
                        defaultValue={formData.last_name}
                        onChange={(e) => {
                            setFormData((prev: Record<string, any>) => ({
                                ...prev,
                                [e.target.name]: e.target.value.trim(),
                            }));
                        }}
                        placeholder='Enter your last name'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                setFocus('fname');
                                setStep(2);
                            }
                        }}
                    />
                </Field>
			</div>

            <ConfirmationDialog message={message} onClose={() => {
                const error_message = message.find(m => m.toLowerCase().includes('failed'));
                if (!error_message)  {
                    location.href = '/register';
                }

                setMessage([]);
            }} />
		</>
	);
}

function ConfirmationDialog({ message, onClose }: { message: string[]; onClose(): void }) {
    useEffect(() => {}, [message]);
	return (
		<Dialog open={Boolean(message.length)} onClose={onClose}>
			<DialogTitle>{message[0] || ''}</DialogTitle>
            <DialogBody>
                {message.slice(1).map((msg, idx) => (
                    <DialogDescription key={idx} className="mb-2">
                        {msg}
                    </DialogDescription>
                ))}
            </DialogBody>
			<DialogActions>
				<Button plain onClick={() => onClose()}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
