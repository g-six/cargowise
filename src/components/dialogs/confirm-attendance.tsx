'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Combobox, ComboboxLabel, ComboboxOption } from '@/components/combobox'
import { useState } from 'react'
import { Text } from '../text'
import { Team } from '@/data'
import { Select } from '../select'
import { fetchData } from '@/utils/api'
import { useEffect, useRef } from 'react'
import { useAppContext } from '@/app/(app)/context-provider'
import { CheckIcon } from '@heroicons/react/20/solid'

type State = 'Going' | 'Updating...' | 'Close'

export function ConfirmAttendanceForm(p: Record<string, any>) {
    const ctx = useAppContext();
    let [theme, setTheme] = useState({ brand: 'zinc' })
    
    let [payload, setPayload] = useState<Record<string, string>>(p['data-attendance'] || {})
    let [isOpen, setIsOpen] = useState(true)
    let [submitAction, setSubmitAction] = useState<State>('Going')
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

    useEffect(() => {
        if (localStorage?.getItem('theme')) {
            setTheme(JSON.parse(localStorage.getItem('theme') || '{}'))
        }
    }, [])

    function submitForm(is_going: boolean) {
        setSubmitAction('Updating...')
        
        fetchData('/api/schedule', {
            method: 'PUT',
        }, { ...payload, is_going }).then(results => {
            const record = results.record;
            if (!record) {
                alert('An error occurred. Please try again.')
            } else {
                setPayload({})
                setIsOpen(false)
            }
        }).finally(() => {
            setSubmitAction('Going')
        })
    }

    return (
        <>
            <Button type="button" color={theme.brand as any} onClick={() => setIsOpen(true)} className='w-full'>
                {submitAction}
            </Button>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>{payload.team}</DialogTitle>
                <DialogBody>
                    <Fieldset>
                        <Legend>{payload.title}</Legend>
                        <Text>Please confirm your attendance for the event below.</Text>
                    </Fieldset>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={() => submitForm(false)}
                        disabled={submitAction === 'Updating...'}>
                        Not attending
                    </Button>

                    <Button
                        onClick={() => submitForm(true)}
                        color='lime'
                        className="min-w-32"
                        disabled={submitAction === 'Updating...'}
                    >
                        {submitAction}
                        {submitAction === 'Updating...' ? '' : <CheckIcon />}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
