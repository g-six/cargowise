'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { useState } from 'react'
import { Text } from '../text'
import { Textarea } from '../textarea'
import { Team } from '@/data'
import { Select } from '../select'
import { fetchData } from '@/utils/api'
import { useEffect, useRef } from 'react'
import PeopleFinder from '../finders/people'
import { useAppContext, useAppDispatch } from '@/app/context-provider'

type AddCoachState = 'Create Record' | 'Creating...' | 'Close'

export function AddCoachForm(p: {
    'data-team': Team;
    'data-people': Record<string, any>[];
}) {
    const ctx = useAppContext();
    const dispatch = useAppDispatch();
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
    let [submitAction, setSubmitAction] = useState<AddCoachState>('Create Record')
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
        fetchData('/api/team/' + p['data-team'].slug + '/coach', { method: 'POST' }, payload).then(result => {
            if (!result) {
                alert('An error occurred. Please try again.')
            } else {
                setPayload({})
                setIsOpen(false)
                // dispatch({
                //     teams: 
                // })
                console.log(result.data)
            }
        }).finally(() => {
            setSubmitAction('Create Record')
        })
    }

    return (
        <>
            <div className='flex gap-2 flex-end w-full'>
                <PeopleFinder people={p['data-people']} onSelect={person => {
                    setIsOpen(false)
                    fetchData('/api/team/' + p['data-team'].slug + '/coach/' + person.slug, { method: 'PUT' }, { role: 'N/A' }).then(record => {
                        if (!record) {
                            alert('An error occurred. Please try again.')
                        } else {
                            setPayload({})
                        }
                    })
                }} label='Assign a coach' />
                <Button type="button" color={theme.brand as any} onClick={() => setIsOpen(true)}>
                    New coach &rarr;
                </Button>
            </div>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>Coach registration form</DialogTitle>
                <DialogBody>
                    <Fieldset>
                        <Legend>Coach information</Legend>
                        <Text>Enter the details of the coach below.</Text>
                        <FieldGroup>
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
                                    <Input name="last_name" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                                </Field>

                                <Field className='sm:col-span-1'>
                                    <Label>Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <Field>
                                    <Label>Phone</Label>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
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
