'use client'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { useEffect, useState } from 'react'

export function CreateJobOrderForm({ closeListener, onSuccess, 'data-show': show }: { toggle?(v: boolean): void, 'data-show'?: boolean; onSuccess?(record: any): void; closeListener?(): void }) {
    const [isOpen, setIsOpen] = useState(show);
    const [payload, setPayload] = useState({
        job: '',
        shipment: ''
    })

    function createJobOrder() {
        if (payload.job && payload.shipment)
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
            }
        })
    }

    useEffect(() => {
        setIsOpen(show)
    }, [show])

	return (
        <Dialog size="xs" open={isOpen} onClose={() => {
            setPayload({ job: '', shipment: '' })
        }}>
            <DialogTitle>Create job order</DialogTitle>
            <DialogDescription>Fill in the details to create a new job order.</DialogDescription>
            <DialogBody className='flex flex-col gap-6'>
                <Field>
                    <Label>Job #</Label>
                    <Input name="job" defaultValue={payload.job} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} onKeyUp={e => {
                        if (e.key === 'Enter') {
                            createJobOrder()
                        }
                    }} />
                </Field>

                <Field>
                    <Label>Shipment #</Label>
                    <Input name="shipment" defaultValue={payload.shipment} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} onKeyUp={e => {
                        if (e.key === 'Enter') {
                            createJobOrder()
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
                    createJobOrder()
                }}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
	)
}
