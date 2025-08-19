'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
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

	return (
		<>
			<Button
				className="max-lg:w-full"
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
								<Field className="col-span-2">
									<Label>Organization name</Label>
									<Input type="text" placeholder="PF Academy" name="organization" />
								</Field>

								<Field className="col-span-2">
									<Label>Team name</Label>
									<Input type="text" placeholder="Athletic Club" name="team" />
								</Field>

								<Field>
									<Label>Birth Year</Label>
									<Select name="year">
										{Array.from({ length: 12 }, (_, i) => {
											const year = new Date().getFullYear() - i - 5
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
									<Input type="text" placeholder="Ollie" name="fname" />
								</Field>

								<Field>
									<Label>Last name</Label>
									<Input type="text" placeholder="Deer" name="lname" />
								</Field>

								<Field>
									<Label>Date of Birth</Label>
									<Input type="date" name="dob" />
								</Field>
							</div>
						)}
						<Fieldset className={step === 2 ? 'block' : 'hidden sm:block'}>
							<Legend className="mt-6 mb-4">Guardian / Coach Information</Legend>
							<div className="grid-cols-2 space-y-6 sm:grid sm:space-x-2">
								<Field>
									<Label>Email</Label>
									<Input type="email" placeholder="Email address" name="email" />
								</Field>
								<Field>
									<Label>Phone</Label>
									<Input type="tel" placeholder="(XXX) XXX-XXXX" name="phone" />
								</Field>
								<Field>
									<Label>First name</Label>
									<Input type="text" placeholder="John" name="first_name" />
								</Field>

								<Field>
									<Label>Last name</Label>
									<Input type="text" placeholder="Deer" name="last_name" />
								</Field>
							</div>
						</Fieldset>
					</div>
				</DialogBody>
				<DialogActions>
					<Button
						color={color as any}
						onClick={() => {
							setStep(step === 1 ? 2 : 1)
						}}
					>
						Next <ArrowRightIcon />
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
