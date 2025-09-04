'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { useState } from 'react'
import { Text } from '../text'
import { Textarea } from '../textarea'
import { Athlete, Team, TeamAthlete } from '@/data'
import { Select } from '../select'
import { fetchData } from '@/utils/api'
import { XMarkIcon } from '@heroicons/react/20/solid'
import GroupFinder from '../finders/groups'

type AddAthleteState = 'Update Record' | 'Updating...' | 'Close' | 'Removing...' | 'Remove'

export function AthleteForm(p: {
    'data-team'?: Team;
    'data-athlete': TeamAthlete
    onComplete?(record?: Record<string, any>): void;
}) {
    let theme = { brand: 'pink' }
    if (localStorage.getItem('theme')) {
        try {
            theme = JSON.parse(localStorage.getItem('theme') || '{}')
        } catch (error) {
            console.warn('Error parsing theme from localStorage:', error)
        }
    }
    let [payload, setPayload] = useState<Record<string, string>>({
        first_name: p['data-athlete'].first_name,
        last_name: p['data-athlete'].last_name,
        date_of_birth: p['data-athlete'].date_of_birth,
    })
    let [isRemoving, setIsRemoving] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    let [isChoosingTeam, openTeamChooser] = useState(false)
    let [submitAction, setSubmitAction] = useState<AddAthleteState>('Update Record')
    let [team, setTeam] = useState<Team | undefined>(p['data-team'])
    let [athlete, setAthlete] = useState<TeamAthlete>(p['data-athlete'])

    function submitForm() {
        if (!team) return
        setSubmitAction('Updating...')
        fetchData('/api/team/' + team.slug + '/athlete/' + athlete.slug, 'PUT', payload).then(record => {
            if (!record) {
                alert('An error occurred. Please try again.')
            } else {
                setPayload({})
                setIsOpen(false)
                p.onComplete?.(record)
            }
        }).finally(() => {
            setSubmitAction('Update Record')
        })
    }

    function removeAthlete() {
        if (!team) return
        const athlete = p['data-athlete'].slug
        setIsRemoving(true)
        fetchData('/api/team/' + team.slug + '/athlete/' + athlete, 'DELETE').then(record => {
            if (!record) {
                alert('An error occurred. Please try again.')
            } else {
                setPayload({})
                setIsOpen(false)
                if (p.onComplete)
                p.onComplete(record)
                else location.reload();
            }
        }).finally(() => {
            setIsRemoving(false)
        })
    }
    return (
        <>
            {team ? <Button type="button" plain onClick={() => setIsOpen(true)}>
                Edit
            </Button> : <GroupFinder label="team" onSelect={(team: Team) => {
                location.href = `/my/team/${team.slug}?add=${p['data-athlete'].slug}`
            }} />}
            <Dialog open={isChoosingTeam} onClose={openTeamChooser}>
                <DialogTitle>{`Add ${p['data-athlete'].first_name} ${p['data-athlete'].last_name} to a team`}</DialogTitle>
                <DialogBody>
                    <Fieldset>
                        <Legend>Choose a team to add</Legend>
                        <Text>Enter the details of the player below.</Text>
                        <FieldGroup>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                                <Field>
                                    <Label>First name</Label>
                                    <Input
                                        name="player_first_name"
                                        defaultValue={p['data-athlete'].first_name}
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <Field>
                                    <Label>Last name</Label>
                                    <Input name="player_last_name" defaultValue={p['data-athlete'].last_name} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                                </Field>
                                <Field>
                                    <Label>Date of birth</Label>
                                    <Input
                                        name="date_of_birth"
                                        type="date"
                                        defaultValue={p['data-athlete'].date_of_birth}
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
                                            defaultValue={p['data-athlete'].number}
                                            onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                        />
                                    </Field>
                                    <Field>
                                        <Label>Role</Label>
                                        <Select name='role' defaultValue={p['data-athlete'].role} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}>
                                            <option value=''>Select a role</option>
                                            <option value='GK'>Goalkeeper</option>
                                            <option value='CB'>Centre back</option>
                                            <option value='WB'>Wing back</option>
                                            <option value='M'>Midfielder</option>
                                            <option value='ST'>Striker</option>
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
                        <Button
                            onClick={() => removeAthlete()}
                            plain
                            className='text-red-500! fill-red-500! bg-gray-500/10! hover:bg-gray-500/20!'
                        >
                            {isRemoving ? 'Please wait...' : <>Remove <XMarkIcon className='fill-red-500' /></>}
                        </Button>
                    </div>
                    <Button plain onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        disabled={submitAction === 'Updating...'}
                        onClick={() => submitForm()}
                        color={theme.brand as any}
                        className="min-w-32"
                    >
                        {submitAction}
                        {submitAction === 'Updating...' ? '' : <> &rarr;</>}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isOpen} onClose={setIsOpen}>
                {team ? <DialogTitle>{`Add Athlete to ${team?.name} ${team?.year_group}`}</DialogTitle> : <DialogTitle>{`${p['data-athlete'].first_name} ${p['data-athlete'].last_name}`}</DialogTitle>}
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
                                        defaultValue={p['data-athlete'].first_name}
                                        onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                    />
                                </Field>
                                <Field>
                                    <Label>Last name</Label>
                                    <Input name="player_last_name" defaultValue={p['data-athlete'].last_name} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} />
                                </Field>
                                <Field>
                                    <Label>Date of birth</Label>
                                    <Input
                                        name="date_of_birth"
                                        type="date"
                                        defaultValue={p['data-athlete'].date_of_birth}
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
                                            defaultValue={p['data-athlete'].number}
                                            onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}
                                        />
                                    </Field>
                                    <Field>
                                        <Label>Role</Label>
                                        <Select name='role' defaultValue={p['data-athlete'].role} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })}>
                                            <option value=''>Select a role</option>
                                            <option value='GK'>Goalkeeper</option>
                                            <option value='CB'>Centre back</option>
                                            <option value='WB'>Wing back</option>
                                            <option value='M'>Midfielder</option>
                                            <option value='ST'>Striker</option>
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
                        <Button
                            onClick={() => removeAthlete()}
                            plain
                            className='text-red-500! fill-red-500! bg-gray-500/10! hover:bg-gray-500/20!'
                        >
                            {isRemoving ? 'Please wait...' : <>Remove <XMarkIcon className='fill-red-500' /></>}
                        </Button>
                    </div>
                    <Button plain onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        disabled={submitAction === 'Updating...'}
                        onClick={() => submitForm()}
                        color={theme.brand as any}
                        className="min-w-32"
                    >
                        {submitAction}
                        {submitAction === 'Updating...' ? '' : <> &rarr;</>}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
