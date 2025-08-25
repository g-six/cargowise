'use client';

import { Button } from '@/components/button';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list';
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog';
import { Heading, Subheading } from '@/components/heading';
import ParentInformationSection from '@/components/forms/parent-information';
import PlayerInformationSection from '@/components/forms/player-information';
import { Database } from '@/database.types';
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	UserGroupIcon,
} from '@heroicons/react/16/solid';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Form({
	'data-theme': theme,
	'data-current-season': currentSeason,
	organization,
}: {
	'data-theme'?: 'light' | 'dark';
	organization?: any;
	'data-current-season'?: Database['public']['Tables']['seasons']['Row'] & {
		season_programs: Database['public']['Tables']['season_programs']['Row'][];
	};
}) {
	const searchParams = useSearchParams();
	const [lname, fname] = (searchParams.get('name') || '').split(', ').filter(Boolean);
	const [formData, setFormData] = useState<Record<string, any>>({
		lname,
		fname,
	});
	const [step, setStep] = useState(0);
	const [focus, setFocus] = useState('phone');

	useEffect(() => {
		if (step === 9) {
		}
		if (step === 1) {
			setFocus('phone');
		}
		if (step === 2) {
			setFocus('fname');
		}
	}, [step]);

	return (
		<div className={`mx-auto w-full max-w-xl lg:mr-0 lg:max-w-lg ${theme === 'dark' ? 'dark' : ''}`}>
			<PlanGrid
				setFormData={setFormData}
				setStep={setStep}
				data-show={step === 0}
				data-form={formData}
				data-current-season={currentSeason}
			/>

			<ParentInformationSection
				data-show={step === 1 || focus === 'last_name'}
				data-focus={focus}
				formData={formData}
				setFormData={setFormData}
				data-theme={theme}
				setStep={setStep}
				setFocus={setFocus}
			/>
			<PlayerInformationSection
				data-show={step === 2 || ['month', 'day', 'year'].includes(focus)}
				data-focus={focus}
				formData={formData}
				setFormData={setFormData}
				data-theme={theme}
				setStep={setStep}
				data-season={organization?.season || null}
				setFocus={setFocus}
			/>

			<div className={`w-full ${step > 0 ? 'flex' : 'hidden'} justify-end gap-x-4 px-6 sm:px-0`}>
				<Button
					type="button"
					className="w-1/2 sm:w-auto"
					onClick={() => {
						if (focus === 'fname') {
							setFocus('last_name');
							setStep(1);
						} else if (focus === 'first_name') {
							setFocus('email');
						} else if (focus === 'email') {
							setFocus('phone');
						} else if (focus === 'last_name') {
							setFocus('first_name');
						} else if (focus === 'lname') {
							setFocus('fname');
						} else if (focus === 'month') {
							setStep(2);
							setFocus('lname');
						} else if (focus === 'day') {
							setFocus('month');
						} else if (focus === 'year') {
							setFocus('day');
						} else if (['year', 'month', 'day'].includes(focus)) {
						}
					}}
				>
					<ChevronLeftIcon />
					Back
				</Button>
				<Button
					type="button"
					color="rose"
					className="w-1/2 sm:w-auto"
					onClick={() => {
						if (focus === 'phone') {
							setFocus('email');
						} else if (focus === 'email') {
							setFocus('first_name');
						} else if (focus === 'first_name') {
							setFocus('last_name');
						} else if (focus === 'last_name') {
							setStep(2);
							setFocus('fname');
						} else if (focus === 'fname') {
							setStep(2);
							setFocus('lname');
						} else if (focus === 'lname') {
							setStep(2);
							setFocus('month');
						} else if (focus === 'month') {
							setStep(9);
						} else if (focus === 'day') {
							setStep(9);
						} else if (focus === 'year') {
							setStep(9);
						}
					}}
				>
					Next
					<ChevronRightIcon className="fill-white!" />
				</Button>
			</div>
			<ConfirmationDialog
				open={step === 9}
				onClose={(success) => {
					if (success) {
                        setFormData({});
                        setStep(0);
                        location.reload();
                        // Handle successful registration
					} else {
                        setStep(2);
                    }
				}}
				data-form={formData}
			/>
		</div>
	);
}

export function PlanGrid({
	setFormData,
	'data-form': formData,
	'data-show': show,
	setStep,
	'data-current-season': currentSeason,
}: {
	'data-form': Record<string, any>;
	'data-show': boolean;
	'data-current-season'?: Database['public']['Tables']['seasons']['Row'] & {
		season_programs: Database['public']['Tables']['season_programs']['Row'][];
	};
	setFormData: (data: Record<string, any>) => void;
	setStep: (step: number) => void;
}) {
	if (!currentSeason || !currentSeason.season_programs || !currentSeason.season_programs.length) return <></>;
	return (
		<div role="list" className="my-8 grid grid-cols-1 gap-y-8 lg:mt-0" id="begin">
			{currentSeason.season_programs.map((option) => (
				<div
					key={option.name}
					className={`${formData.plan === option.name ? 'flex' : formData.plan ? 'hidden' : 'flex'} flex-col justify-between overflow-hidden sm:mb-0 sm:mb-12 sm:rounded-xl sm:outline -outline-offset-1 outline-white/10`}
				>
					<div className="flex flex-col items-center justify-center gap-x-4 sm:flex-row sm:justify-start sm:border-b sm:p-6 border-white/10 sm:bg-gray-800/50">
						<Heading className="sm:text-sm/6!">{option.name}</Heading>
						{option.league_discount && option.discount_ends_at && new Date(option.discount_ends_at) > new Date() ? <Subheading force='text-amber-400!'>${option.fee - option.league_discount} Early Bird</Subheading> : <></>}
						<div className="hidden sm:block sm:flex-1" />
						<Subheading force={option.discount_ends_at && new Date(option.discount_ends_at) > new Date() ? 'line-through opacity-40' : ''}>${option.fee}</Subheading>
						{option.sort_order === 1 && <span className="mt-4 text-6xl sm:mt-0 sm:text-base">🏆</span>}
						{option.sort_order === 2 && <span className="mt-4 text-6xl sm:mt-0 sm:text-base">⚡️</span>}
						{option.sort_order === 3 && (
							<UserGroupIcon className="size-12 sm:size-6 text-green-400" />
						)}
					</div>
					<dl className="-my-3 flex flex-1 flex-col justify-between divide-y px-6 text-sm/6 sm:py-4 divide-white/10">
						<div
							className={`flex-1 flex-col items-center justify-between gap-x-4 py-3 sm:items-start ${show ? 'flex' : 'hidden sm:flex'}`}
						>
							<dt className="sr-only">Description</dt>
							{option.description?.split('\n').map((line, index) => (
								<dd key={index} className="mb-2 text-center leading-4 sm:text-left text-gray-300">
									{line}
								</dd>
							))}
						</div>
						<div className="flex justify-end gap-x-4 py-3">
							{show ? (
								<Button
									onClick={() => {
                                        let total = option.fee;
                                        if (option.league_discount && option.discount_ends_at && new Date(option.discount_ends_at) > new Date()) {
                                            total -= option.league_discount;
                                        }
										setFormData((prev: Record<string, any>) => ({ ...prev, plan: option.name, fee: option.fee, total }));
										setStep(1);
									}}
									className="flex w-full justify-between sm:w-auto sm:justify-center"
								>
									<span>Choose this option</span> <ChevronDoubleRightIcon className="hidden sm:block" />
								</Button>
							) : (
								<Button
									onClick={() => {
										setFormData((prev: Record<string, any>) => ({ ...prev, plan: undefined }));
										setStep(0);
									}}
									className="flex w-full justify-between underline sm:w-auto sm:justify-center text-white/70 decoration-white/20 hover:text-white hover:decoration-white/50"
									plain
								>
									<ChevronDoubleLeftIcon className="hidden sm:static" /> <span>Choose a different option</span>
								</Button>
							)}
						</div>
					</dl>
				</div>
			))}
		</div>
	);
}

function ConfirmationDialog({
	open,
	onClose,
	'data-form': formData,
}: {
	open: boolean;
	onClose(success?: boolean): void;
	'data-form': Record<string, any>;
}) {
	const [loadingMessage, setLoadingMessage] = useState<string>('Sign us up');
	const [status, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

	function submit() {
		setLoadingMessage('Processing...');
		fetch('/api/account/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then(async (res) => {
				if (res.ok) {
					const data = await res.json();
					setSubmissionStatus('success');
					// if (data?.member) {
					//     signUp(data.member.id);
					// } else {
					//     setMessage([`Registration failed, ${formData.fname} has already been registered`, 'This might be due to another parent or guardian previously signed up. Please contact us for details at 236-777-1283.']);
					// }
				} else {
					const errorData = await res.json();
					console.warn('Registration failed:', errorData);
				}
			})
			.catch((error) => {
				console.error('Error during registration:', error);
			})
			.finally(() => {
				setLoadingMessage('Sign us up!');
			});
	}
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{status === 'success' ? `Thanks for signing ${formData.fname} up!` : `Proceed to sign up ${formData.fname}?`}</DialogTitle>
			<DialogBody>
				{status === 'success' ? (
					<p className="text-gray-300">
						You should be getting an email shortly.
					</p>
				) : (
					<div className="flex flex-col gap-y-2">
						<p className="text-gray-300">Please confirm the following details:</p>
						<DescriptionList>
							<DescriptionTerm>Athlete</DescriptionTerm>
							<DescriptionDetails>
								{formData.fname} {formData.lname}
							</DescriptionDetails>

							<DescriptionTerm>Birthday</DescriptionTerm>
							<DescriptionDetails>{formData.date_of_birth}</DescriptionDetails>

							<DescriptionTerm>Parent/guardian</DescriptionTerm>
							<DescriptionDetails>
								{formData.first_name} {formData.last_name}
							</DescriptionDetails>

							<DescriptionTerm>Email</DescriptionTerm>
							<DescriptionDetails>{formData.email}</DescriptionDetails>

							<DescriptionTerm>Phone</DescriptionTerm>
							<DescriptionDetails>{formData.phone}</DescriptionDetails>
						</DescriptionList>
					</div>
				)}
			</DialogBody>
			<DialogActions>
				<Button plain disabled={loadingMessage.startsWith('Processing')} onClick={() => onClose(status === 'success')}>
					{status === 'success' ? 'Close' : 'Go back'}
				</Button>
				{status !== 'success' && <Button
					color={loadingMessage.startsWith('Processing') ? undefined : 'rose'}
					disabled={loadingMessage.startsWith('Processing')}
					onClick={() => submit()}
				>
					{loadingMessage}
				</Button>}
			</DialogActions>
		</Dialog>
	);
}
