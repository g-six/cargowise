'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input, InputGroup } from '@/components/input'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { Text } from '../text'
import { Textarea } from '../textarea'
import { Team } from '@/data'
import { Select } from '../select'
import { fetchData } from '@/utils/api'
import { useEffect, useRef } from 'react'
import PeopleFinder from '../finders/people'

type AddAthleteState = 'Create Record' | 'Creating...' | 'Close'

export function AddAthleteForm(p: {
    'data-team': Team;
    'data-people': Record<string, any>[];
    onComplete(record?: Record<string, any>): void;
}) {
    let theme = { brand: 'pink' }
    if (localStorage.getItem('theme')) {
        try {
            theme = JSON.parse(localStorage.getItem('theme') || '{}')
        } catch (error) {
            console.warn('Error parsing theme from localStorage:', error)
        }
    }
    let [payload, setPayload] = useState<Record<string, string>>({})
    let [isOpen, setIsOpen] = useState(false)
    let [submitAction, setSubmitAction] = useState<AddAthleteState>('Create Record')
    let [search, setSearchTerm] = useState<string>('')
    const debounceTimeout = 400
    const searchRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (searchRef.current) clearTimeout(searchRef.current)
        if (search) {
            searchRef.current = setTimeout(() => {
                // Place your debounced search logic here, e.g. API call or filter
                // Example: fetchMembers(search)
                console.log({search})
            }, debounceTimeout)
        }
        return () => {
            if (searchRef.current) clearTimeout(searchRef.current)
        }
    }, [search])

    function submitForm() {
        setSubmitAction('Creating...')
        fetchData('/api/team/' + p['data-team'].slug + '/athlete', { method: 'POST' }, payload).then(result => {
            if (!result) {
                alert('An error occurred. Please try again.')
            } else {
                setPayload({})
                setIsOpen(false)
                p.onComplete(result.data)
            }
        }).finally(() => {
            setSubmitAction('Create Record')
        })
    }

    return (
        <>
            <div className='flex gap-2'>
                <PeopleFinder people={p['data-people']} onSelect={person => {
                    setIsOpen(false)
                    fetchData('/api/team/' + p['data-team'].slug + '/athlete/' + person.slug, { method: 'PUT' }, { role: 'N/A' }).then(record => {
                        if (!record) {
                            alert('An error occurred. Please try again.')
                        } else {
                            setPayload({})
                            p.onComplete(record)
                        }
                    })
                }} />
                <Button type="button" color={theme.brand as any} onClick={() => setIsOpen(true)}>
                    Add a new member
                </Button>
            </div>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>{`Add Athlete to ${p['data-team'].name} ${p['data-team'].year_group}`}</DialogTitle>
                <DialogBody>
                    <Fieldset>
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
                                    <Input name="player_last_name" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                                </Field>
                                <Field>
                                    <Label>Date of birth</Label>
                                    <Input
                                        name="date_of_birth"
                                        type="date"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <div className='flex gap-4'>
                                    <Field className='w-16'>
                                        <Label>Number</Label>
                                        <Input
                                            name="number"
                                            type="number"
                                            max={99}
                                            min={0}
                                            onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                        />
                                    </Field>
                                    <Field>
                                        <Label>Role</Label>
                                        <Select name='role' onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}>
                                            <option value=''>Select a role</option>
                                            <option value='GK'>Goalkeeper</option>
                                            <option value='CB'>Centre back</option>
                                            <option value='WB'>Wing back</option>
                                            <option value='M'>Midfielder</option>
                                            <option value='S'>Striker</option>
                                            <option value='W'>Winger</option>
                                        </Select>
                                    </Field>
                                </div>
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
                </DialogBody>
                <DialogActions>
                    <div className="grow">
                        <Button plain onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </div>

                    <Button
                        disabled={submitAction === 'Creating...'}
                        onClick={() => submitForm()}
                        color={theme.brand as any}
                        className="min-w-32"
                    >
                        {submitAction}
                        {submitAction === 'Creating...' ? '' : <> &rarr;</>}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
