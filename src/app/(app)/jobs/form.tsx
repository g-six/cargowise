'use client'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { useEffect, useState } from 'react'
import Spinner from '@/components/spinners'
import { ArrowDownOnSquareIcon } from '@heroicons/react/16/solid'

export function CreateScheduleForm({ closeListener, onSuccess, 'data-show': show }: { toggle?(v: boolean): void, 'data-show'?: boolean; onSuccess?(record: any): void; closeListener?(): void }) {
    const [isOpen, setIsOpen] = useState(show);
    const [errorMessage, setErrorMessage] = useState('');
    const [payload, setPayload] = useState({
        job: '',
        shipment: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    function createSchedule() {
        if (payload.job && payload.shipment) {
            setIsLoading(true);
            fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }).then((res) => {
                if (res.ok) {
                    setPayload({ job: '', shipment: '' })
                    res.json().then(({ record }) => onSuccess?.(record))
                    // Optionally, you might want to refresh the job list or give feedback to the user here
                } else {
                    res.json().then((error) => {
                        const { message } = error
                        if (message.includes('already exists')) {
                            setErrorMessage(`Job order with job #${payload.job} or shipment #${payload.shipment} already exists.`)
                        }
                        console.warn('Error creating job order:', error)
                    })
                }
            }).catch(error => {
                console.error('Error creating job order:', error)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    useEffect(() => {
        setIsOpen(show)
    }, [show])

	return (
        <Dialog size="xs" open={isOpen} onClose={() => {
            setPayload({ job: '', shipment: '' })
        }}>
            <DialogTitle>Create job order</DialogTitle>
            <DialogDescription className={errorMessage ? 'text-red-500! text-xs/4!' : ''}>{errorMessage ||'Fill in the details to create a new job order.'}</DialogDescription>
            <DialogBody className='flex flex-col gap-6'>
                <Field>
                    <Label>Job #</Label>
                    <Input name="job" defaultValue={payload.job} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} onKeyUp={e => {
                        if (e.key === 'Enter') {
                            createSchedule()
                        }
                    }} />
                </Field>

                <Field>
                    <Label>Shipment #</Label>
                    <Input name="shipment" defaultValue={payload.shipment} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} onKeyUp={e => {
                        if (e.key === 'Enter') {
                            createSchedule()
                        }
                    }} />
                </Field>
            </DialogBody>
            <DialogActions>
                <Button type="button" plain onClick={() => {
                    setIsOpen(false);
                    closeListener?.();
                }}>
                    Cancel
                </Button>
                <Button type="submit" color="lime" onClick={() => {
                    createSchedule()
                }}>
                    Create {isLoading ? <Spinner className='size-3.5 fill-white/50' /> : <ArrowDownOnSquareIcon />}
                </Button>
            </DialogActions>
        </Dialog>
	)
}
