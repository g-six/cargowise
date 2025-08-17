'use client'
import { Dialog, DialogActions, DialogBody, DialogButton, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { UserPlusIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

export function CreateJobOrderForm({ onSuccess }: { onSuccess(record: any): void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [payload, setPayload] = useState({
        id: '',
        shipment: ''
    })

    function createJobOrder() {
        fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.ok) {
                setIsOpen(false)
                res.json().then(({ record }) => onSuccess(record))
                // Optionally, you might want to refresh the job list or give feedback to the user here
            }
        })
    }
	return (
		<DialogButton icon={<UserPlusIcon />} label='Create job order' onClick={(e) => {
            setIsOpen(true)
        }}>
			<Dialog size="lg" open={isOpen} onClose={() => setIsOpen(false)}>
				<DialogTitle>Create job order</DialogTitle>
				<DialogDescription>Fill in the details to create a new job order.</DialogDescription>
				<DialogBody>
                    <Field>
                        <Label>Job #</Label>
                        <Input name="id" defaultValue={payload.id} onChange={(e) => setPayload({ ...payload, [e.target.name]: e.target.value })} onKeyUp={e => {
                            if (e.key === 'Enter') {
                                createJobOrder()
                            }
                        }} />
                    </Field>
                </DialogBody>
				<DialogActions>
					<Button type="button" plain onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button type="submit" color="lime" onClick={() => {
                        createJobOrder()
                    }}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</DialogButton>
	)
}
