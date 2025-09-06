'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Combobox, ComboboxLabel, ComboboxOption } from '@/components/combobox'
import { useState } from 'react'
import { Text } from '../text'
import { Textarea } from '../textarea'
import { Team } from '@/data'
import { Select } from '../select'
import { fetchData } from '@/utils/api'
import { useEffect, useRef } from 'react'
import PeopleFinder from '../finders/people'
import { useAppContext } from '@/app/(app)/context-provider'

type State = 'Add Event' | 'Creating...' | 'Close'

export function AddEventForm(p: {
    onComplete(record?: Record<string, any>): void;
}) {
    const ctx = useAppContext();
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
    let [submitAction, setSubmitAction] = useState<State>('Add Event')
    let [search, setSearchTerm] = useState<string>('')
    const [locations, setLocations] = useState<Record<string, any>[]>([]);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (!search) {
            return;
        }
        const handler = setTimeout(() => {
            // Cancel previous request if exists
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            fetchData(`/api/locations?q=${encodeURIComponent(search)}`, { signal: controller.signal })
                .then(data => {
                    if (data?.records) {
                        setLocations(data.records);
                    }
                })
                .catch(err => {
                    if (err.name !== 'AbortError') {
                        console.error(err);
                    }
                });
        }, 200);

        return () => {
            clearTimeout(handler);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [search]);

    function submitForm() {
        setSubmitAction('Creating...')
        
        fetchData('/api/schedule', {
            method: 'POST',
        }, payload).then(results => {
            const record = results.record;
            if (!record) {
                alert('An error occurred. Please try again.')
            } else {
                setPayload({})
                p.onComplete(record)
                setIsOpen(false)
            }
        }).finally(() => {
            setSubmitAction('Add Event')
        })
    }

    return (
        <>
            <div className='w-full'>
                {/* <PeopleFinder people={p['data-people']} onSelect={person => {
                    setIsOpen(false)
                    fetchData('/api/team/' + p['data-team'].slug + '/athlete/' + person.slug, 'PUT', { role: 'N/A' }).then(record => {
                        if (!record) {
                            alert('An error occurred. Please try again.')
                        } else {
                            setPayload({})
                            p.onComplete(record)
                        }
                    })
                }} /> */}
            </div>
            <Button type="button" color={theme.brand as any} onClick={() => setIsOpen(true)} className='w-full'>
                {submitAction}
            </Button>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>{submitAction}</DialogTitle>
                <DialogBody>
                    <Fieldset>
                        <Legend>Event information</Legend>
                        <Text>Enter the details of the event below.</Text>
                        <FieldGroup>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                                <Field>
                                    <Label>Event Name</Label>
                                    <Input
                                        name="title"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <Field>
                                    <Label>Team</Label>
                                    <Select name="team" onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}>
                                        <option value="">Select a team</option>
                                        {ctx?.organization.teams.map((team: Team) => (
                                            <option key={team.slug} value={team.slug}>
                                                {team.name} {team.age_group || ''}
                                            </option>
                                        ))}
                                    </Select>
                                </Field>
                                <Field>
                                    <Label>Date</Label>
                                    <Input
                                        name="start_date"
                                        type="date"
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <div className='flex gap-4'>
                                    <Field className='w-1/2'>
                                        <Label>Start Time</Label>
                                        <Input
                                            name="start_time"
                                            type="time"
                                            max={99}
                                            min={0}
                                            onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                        />
                                    </Field>
                                    <Field className='w-1/2'>
                                        <Label>Duration</Label>
                                        <Select name='duration' onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}>
                                            <option value=''>--</option>
                                            <option value='30'>30m</option>
                                            <option value='45'>45m</option>
                                            <option value='60'>1hr</option>
                                            <option value='90'>1.5hr</option>
                                            <option value='120'>2hr</option>
                                        </Select>
                                    </Field>
                                </div>
                                 {/* displayValue={(user) => user?.name} defaultValue={currentUser} */}
                                 <div className='sm:col-span-2'>
                                    <Field className='w-full sm:w-xs'>
                                        <Label>Location</Label>
                                        <Combobox name="location" options={locations || []}
                                            displayFilter={location => {
                                                let locationStr = ''
                                                if (location?.name) locationStr += (locationStr ? ', ' : '') + location.name
                                                if (location?.slug) locationStr += location.slug
                                                if (location?.street_1) locationStr += (locationStr ? ', ' : '') + location.street_1
                                                if (location?.city_town) locationStr += (locationStr ? ', ' : '') + location.city_town
                                                if (location?.postal_code) locationStr += (locationStr ? ' ' : '') + location.postal_code
                                                return locationStr
                                            }}
                                            displayValue={(location) => location?.name || ''}
                                            onUserInput={setSearchTerm}
                                            onChange={(location: Record<string, string>) => setPayload({ ...payload, location: location?.slug || '' })}
                                        >
                                            {(location) => (
                                            <ComboboxOption value={location}>
                                                <ComboboxLabel>{location.name}</ComboboxLabel>
                                            </ComboboxOption>
                                            )}
                                        </Combobox>
                                    </Field>
                                </div>
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
                        disabled={submitAction === 'Creating...'
                            || !payload.title
                            || !payload.team
                            || !payload.start_date
                            || !payload.start_time
                            || !payload.duration
                            || !payload.location
                        }
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
