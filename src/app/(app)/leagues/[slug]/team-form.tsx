'use client'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import { useState } from 'react'

export function TeamRegistrationForm() {
	const [payload, setPayload] = useState<Record<string, string>>({})
	return (
		<section>
			{/* ... */}
			<Fieldset>
				<Legend>Team information</Legend>
				<Text>Enter your team details below.</Text>

				<FieldGroup>
                    <Field>
                        <Label>Academy / Club</Label>
                        <Input name="organization" placeholder='Enter your academy or club name' onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                    </Field>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                        <Field className="sm:col-span-2">
                            <Label>Team</Label>
                            <Input name="team" placeholder='Enter your team name' onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                        </Field>
                        <Field>
                            <Label>Age Group</Label>
                            <Select name="age_group" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}>
                                <option value={2010}>U16</option>
                                <option value={2012}>U14</option>
                                <option value={2014}>U12</option>
                                <option value={2016}>U10</option>
                                <option value={2018}>U8</option>
                                <option value={2020}>U6</option>
                            </Select>
                        </Field>
                    </div>
                    
                    <Field>
                        <Label>Email address</Label>
                        <Input name="email" type='email' onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                    </Field>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                        <Field className='sm:col-span-2'>
                            <Label>Phone (contact)</Label>
                            <Input name="phone" type='tel' onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                        </Field>
                    </div>
				</FieldGroup>
			</Fieldset>
			{/* ... */}
		</section>
	)
}
