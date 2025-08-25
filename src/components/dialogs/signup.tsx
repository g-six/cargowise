'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { useState } from 'react'
import { Text } from '../text'
import { Textarea } from '../textarea'

type SignupState = 'Sign us up' | 'Signing up...' | 'Player information' | 'Parent/guardian information'

export function SignupForm(p: {
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
	let [submitAction, setSubmitAction] = useState<SignupState>('Player information')

	function submitForm(direction: number) {
		if (submitAction === 'Sign us up') {
			if (direction === -1) setSubmitAction('Player information')
			else setSubmitAction('Signing up...')
		} else if (submitAction === 'Player information' && direction > 0) {
			setSubmitAction('Parent/guardian information')
		} else if (submitAction === 'Parent/guardian information') {
			if (direction === -1) setSubmitAction('Player information')
			else setSubmitAction('Sign us up')
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
					<Fieldset className={submitAction === 'Player information' ? '' : 'hidden'}>
						<Legend>Email and phone number</Legend>
						<Text>
							Please enter your email address and phone number below.
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
					<Fieldset className={submitAction === 'Parent/guardian information' ? '' : 'hidden'}>
						<Legend>Player information</Legend>
						<Text>Enter the details of the player below.</Text>
						<FieldGroup>
							<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
								<Field>
									<Label>First name</Label>
									<Input
										name="player_first_name"
										onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
									/>
								</Field>
								<Field>
									<Label>Last name</Label>
									<Input name="last_name" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
								</Field>
								<Field>
									<Label>Date of birth</Label>
									<Input
										name="date_of_birth"
										type="date"
										onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
									/>
								</Field>
								<Field className="pt-6 sm:col-span-2">
									<Label>Tell us a bit about the player&rsquo;s experience (optional)</Label>
									<Description>
										If you think it would help us understand the player better and the level they are at, please share any
										relevant details.
									</Description>
									<Textarea name="player_notes" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
								</Field>
							</div>
						</FieldGroup>
					</Fieldset>

					<Fieldset className={['Sign us up', 'Signing up...'].includes(submitAction) ? '' : 'hidden'}>
						<Legend>Parent/guardian details</Legend>
						<Text>Enter the details of the parent or guardian below.</Text>
						<FieldGroup>
							<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
								<Field>
									<Label>First name</Label>
									<Input
										name="guardian_first_name"
										onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
									/>
								</Field>
								<Field>
									<Label>Last name</Label>
									<Input
										name="guardian_last_name"
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
						{submitAction !== 'Player information' ? (
							<Button onClick={() => submitForm(-1)}>&larr; Go back</Button>
						) : (
							<Button plain onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
						)}
					</div>

					<Button
						disabled={submitAction === 'Signing up...'}
						onClick={() => submitForm(1)}
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
