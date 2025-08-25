'use client';
import { Database } from '@/database.types';
import { useEffect, useRef, useState } from 'react';
import { Field, Label } from '../fieldset';
import { Heading } from '../heading';
import { Input } from '../input';

export default function PlayerInformationSection({
	'data-theme': theme,
	'data-season': season,
	setFormData,
	formData,
	setFocus,
	setStep,
	'data-show': show = false,
	'data-focus': focus = '',
	...rest
}: {
	setFormData(data: Record<string, any>): void;
	formData: Record<string, any>;
	setStep(s: number): void;
	setFocus(name: string): void;
	'data-focus': string;
	'data-theme'?: 'light' | 'dark';
	'data-season'?: {
		name: string;
		start_data: string;
		end_date: string;
		season_programs: Database['public']['Tables']['season_programs']['Row'][];
	} | null;
	'data-show'?: boolean;
}) {
	const [debounced, setDebounced] = useState<string>('your child');

	const [programOptions, setPrograms] = useState<Database['public']['Tables']['season_programs']['Row'][]>([]);
	const dayRef = useRef<HTMLInputElement>(null);
	const monthRef = useRef<HTMLInputElement>(null);
	const yearRef = useRef<HTMLInputElement>(null);
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const [dob, setDob] = useState<{
		year: number;
		month: number;
		day: number;
	}>({
		year: 2013,
		month: 10,
		day: 1,
	});

	useEffect(() => {
		if (show) {
			if (focus === 'year' && yearRef.current) {
				yearRef.current.focus();
			} else if (focus === 'month' && monthRef.current) {
				monthRef.current.focus();
			} else if (focus === 'day' && dayRef.current) {
				dayRef.current.focus();
			} else if (focus === 'fname' && firstNameRef.current) {
				firstNameRef.current.focus();
			} else if (focus === 'lname' && lastNameRef.current) {
				lastNameRef.current.focus();
			}
		}
	}, [focus, show]);

	useEffect(() => {
		const age = Number(
			formData.age_group
				?.split('')
				.filter((w: string) => !isNaN(Number(w)))
				.join('')
		);
		setPrograms([]);
		for (const program of season?.season_programs || []) {
			const [from, to] = program.range
				.split('-')
				.map((n) => {
					const num = Number(n);
					if (isNaN(num)) return 0;
					return new Date().getFullYear() - num;
				})
				.filter(Boolean);
			if (age <= from && age >= to) {
				setPrograms((prev) => [...prev.filter((p) => p.name !== program.name), program]);
			}
		}
	}, [formData.age_group, season?.season_programs]);

	useEffect(() => {
		const t = setTimeout(() => {
			setDebounced(formData.fname || 'your child');
		}, 500);

		return () => {
			clearTimeout(t);
		};
	}, [formData.fname]);

	useEffect(() => {
		setFormData((prev: Record<string, any>) => ({
			...prev,
			date_of_birth: `${dob.year}-${String(dob.month).padStart(2, '0')}-${String(dob.day).padStart(2, '0')}`,
		}));
	}, [dob]);

	useEffect(() => {
		const keys = Object.keys(formData.fees || {}).filter(
			(w) => Boolean(w) && (w.toLowerCase().includes('training only') || w.toLowerCase().includes('incl. training'))
		);
		const secondaries = Object.keys(formData.fees || {}).filter(
			(w) => Boolean(w) && !w.toLowerCase().includes('training only') && !w.toLowerCase().includes('incl. training')
		);
		let total = 0;
		for (const key of keys) {
			total += Number(formData.fees?.[key] || 0);
		}
		for (const key of secondaries) {
			total += Number(formData.fees?.[key] || 0);
			if (keys.find((w) => w.toLowerCase().includes('incl. training'))) {
				const program = programOptions.find((o) => o.name === key);
				if (program && program.league_discount) {
					total -= program.league_discount;
				}
			}
		}

		setFormData((prev: typeof formData) => ({
			...prev,
			total,
		}));
	}, [Object.keys(formData.fees || {}).join('-')]);

	return (
		<>
			<div className={`${show ? 'm-6 grid-cols-4 gap-6 sm:mx-0 sm:grid' : 'hidden'}`}>
				<Field className={`${focus === 'fname' ? 'block' : 'hidden'} col-span-2 sm:block`}>
					<Label data-theme={theme}>Player/child first name</Label>
					<Input
						data-theme={theme}
						id="fname"
						name="fname"
						type="text"
						autoComplete="given-name"
						defaultValue={formData?.fname || ''}
						onChange={(e) => {
							setFormData((prev: Record<string, any>) => ({
								...prev,
								[e.target.name]: e.target.value.trim(),
							}));
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								setFocus('lname');
							}
						}}
						placeholder="Enter player first name"
						ref={firstNameRef}
					/>
				</Field>
				<Field className={`${focus === 'lname' ? 'block' : 'hidden'} col-span-2 sm:block`}>
					<Label data-theme={theme}>Player/child last name</Label>
					<Input
						data-theme={theme}
						id="lname"
						name="lname"
						type="text"
						autoComplete="family-name"
						defaultValue={formData?.lname || ''}
						onChange={(e) => {
							setFormData((prev: Record<string, any>) => ({
								...prev,
								[e.target.name]: e.target.value.trim(),
							}));
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								setFocus('month');
							}
						}}
						placeholder="Enter player last name"
						ref={lastNameRef}
					/>
				</Field>
				<div className={`${['year', 'month', 'day'].includes(focus) ? 'flex' : 'hidden'} col-span-4 gap-x-2`}>
					<Field className="flex-1">
						<Label data-theme={theme}>Child&rsquo;s date of birth</Label>
						<Input
							data-theme={theme}
							id="month"
							name="month"
							type="text"
							autoComplete="birth-month"
							defaultValue="October"
							onChange={(e) => {
								let val = Number(e.target.value.trim());
								if (isNaN(val)) {
									const mon = e.target.value.trim().toLowerCase();
									const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
									val = months.findIndex((m) => mon.startsWith(m)) + 1;
								}
								setDob((prev) => ({
									...prev,
									month: val,
								}));
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									let val = Number(e.currentTarget.value.trim());
									if (isNaN(val)) {
										const mon = e.currentTarget.value.trim().toLowerCase();
										const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
										val = months.findIndex((m) => mon.startsWith(m)) + 1;
									}
									setDob((prev) => ({
										...prev,
										month: val,
									}));
									e.preventDefault();
									setFocus('day');
								}
							}}
							placeholder="Month"
							ref={monthRef}
						/>
					</Field>
					<Field className="w-1/4">
						<Label data-theme={theme} aria-label="birth day">
							&nbsp;
						</Label>
						<Input
							data-theme={theme}
							id="day"
							name="day"
							type="text"
							autoComplete="birth-day"
							onChange={(e) => {
								let val = Number(e.target.value.trim());
								if (!isNaN(val)) {
									setDob((prev) => ({
										...prev,
										day: val,
									}));
								}
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
                                    let val = Number(e.currentTarget.value.trim());
                                    if (!isNaN(val)) {
                                        setDob((prev) => ({
                                            ...prev,
                                            day: val,
                                        }));
                                    }
									e.preventDefault();
									setFocus('year');
								}
							}}
							placeholder="28"
							ref={dayRef}
						/>
					</Field>
					<Field className="w-1/4">
						<Label data-theme={theme} aria-label="birth year">
							&nbsp;
						</Label>
						<Input
							data-theme={theme}
							id="year"
							name="year"
							type="number"
							autoComplete="birth-year"
							onChange={(e) => {
								let val = Number(e.target.value.trim());
								if (val > 2008) {
									setDob((prev) => ({
										...prev,
										year: val,
									}));
								}
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									setStep(9);
								}
							}}
							placeholder="Year"
							ref={yearRef}
						/>
					</Field>
				</div>
			</div>

			{Boolean(formData.total) && (
				<Heading className={`col-span-2 mt-6 text-right ${show ? 'block' : 'hidden'}`}>
					Total: $
					{formData.total?.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</Heading>
			)}
		</>
	);
}
