'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { ArrowDownOnSquareIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function PlanSelector({
	className,
	color = 'rose',
	'data-price': price,
}: {
	className?: string
	color?: string
	'data-price': Record<string, any>
}) {
	const [isOpen, toggleForm] = useState(false)
	const [step, setStep] = useState(1)
    const [payload, setPayload] = useState<Record<string, string>>({})

    async function createOrganization(data: Record<string, string>) {
        const response = await fetch('/api/organizations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.organization,
                phone: data.phone,
                email: data.email,
            }),
        })

        if (!response.ok) {
            console.error('Failed to create organization:', response.statusText)
            return null
        }
        
        const organization = await response.json()
        
        if (organization.slug) {
            const teamResponse = await fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    name: data.team,
                    organization: organization.slug,
                }),
            })
        } else console.warn('Unable to sign up', { organization })
    }

	return (
		<>
			<Button
				className="lg:hidden w-1/2"
				color={(color as any) || 'rose'}
				onClick={() => {
					toggleForm(true)
				}}
			>
				Let&rsquo;s Go <ArrowRightIcon />
			</Button>
			<Dialog open={isOpen} onClose={() => toggleForm(false)} className="sm:max-w-md">
				<DialogTitle className="capitalize">{price.unit} details</DialogTitle>
				<DialogBody>
					<DialogDescription>Fill up the form to get started</DialogDescription>
					<div className="my-6 flex flex-col gap-y-6">
						{price.unit.toLowerCase().includes('team') ? (
							<div className={`grid-cols-4 space-y-6 sm:grid sm:space-x-2 ${step == 1 ? 'block' : 'hidden'}`}>
								<Field className='col-span-4'>
									<Label>Organization name</Label>
									<Input type="text" placeholder="Enter academy / club name" name="organization" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>

								<Field className="col-span-3">
									<Label>Team name</Label>
									<Input type="text" placeholder="Enter team name" name="team" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>

								<Field className='col-span-1'>
									<Label>Birth Year</Label>
									<Select name="year_group" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))}>
										{Array.from({ length: price.min_year - price.max_year }, (_, i) => {
											const year = price.max_year + i
											return (
												<option key={year} value={year}>
													{year}
												</option>
											)
										})}
									</Select>
								</Field>
							</div>
						) : (
							<div className={`grid-cols-2 space-y-6 sm:grid sm:space-x-2 ${step == 1 ? 'block' : 'hidden'}`}>
								<Field>
									<Label>First name</Label>
									<Input type="text" placeholder="Ollie" name="fname" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>

								<Field>
									<Label>Last name</Label>
									<Input type="text" placeholder="Deer" name="lname" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>

								<Field>
									<Label>Date of Birth</Label>
									<Input type="date" name="date_of_birth" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>
							</div>
						)}
						<Fieldset className={step === 2 ? 'block' : 'hidden sm:block'}>
							<Legend className="mt-6 mb-4">Guardian / Coach Information</Legend>
							<div className="grid-cols-2 space-y-6 sm:grid sm:space-x-2">
								<Field>
									<Label>Email</Label>
									<Input type="email" placeholder="Email address" name="email" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>
								<Field>
									<Label>Phone</Label>
									<Input type="tel" placeholder="(XXX) XXX-XXXX" name="phone" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>
								<Field>
									<Label>First name</Label>
									<Input type="text" placeholder="John" name="first_name" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>

								<Field>
									<Label>Last name</Label>
									<Input type="text" placeholder="Deer" name="last_name" onChange={e => setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
								</Field>
							</div>
						</Fieldset>
					</div>
				</DialogBody>
				<DialogActions>
					{step > 1 && <Button
						onClick={() => {
                            if (step > 1)
							setStep(prev => (prev - 1))
						}}
                        className='lg:hidden'
					>
						<ArrowLeftIcon className='max-lg:hidden' /> Back
					</Button>}
					<Button
						color={color as any}
						onClick={() => {
                            if (step < 2)
							setStep(step => (step + 1))
                            else {
                                createOrganization(payload).then(console.log).catch(console.warn)
                            }
						}}
                        className='lg:hidden'
					>
						<span>{step === 2 ? 'Sign Up' : 'Next'}</span> {step === 2 ? <ArrowDownOnSquareIcon /> : <ArrowRightIcon />}
					</Button>
					<Button
						color={color as any}
						onClick={() => {
                            const { email, phone } = payload
                            createOrganization(payload).then(console.log).catch(console.warn)
						}}
                        className='max-lg:hidden'
					>
						<span className='max-lg:hidden'>Sign Up</span><span className='lg:hidden'>{step === 2 ? 'Sign Up' : 'Next'}</span> {step === 2 ? <ArrowDownOnSquareIcon className='max-lg:hidden' /> : <ArrowRightIcon className='max-lg:hidden' />}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
