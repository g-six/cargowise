export async function sendTextMessage(phoneNumber: string, content: string): Promise<void> {
	const openPhoneApiKey = process.env.OPEN_PHONE_API_KEY;
	const userId = process.env.OPEN_PHONE_USER_ID;
	const from = process.env.OPEN_PHONE_PHONE_NUMBER;
	if (!openPhoneApiKey) {
		throw new Error('OPEN_PHONE_API_KEY is not set');
	}
	const body = JSON.stringify(
		{
			to: phoneNumber.split(',').map(p => p.startsWith('+') ? p : `+1${p}`),
			content,
			userId,
			from,
		},
		null,
		2
	);

	const response = await fetch('https://api.openphone.com/v1/messages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: openPhoneApiKey,
		},
		body,
	});

	if (!response.ok) {
		const errorData = await response.json();
        console.warn(errorData);
		throw new Error(`Failed to send message: ${errorData.message}`);
	}
}

export async function listContacts(filters: Record<string, string>): Promise<any[]> {
	const openPhoneApiKey = process.env.OPEN_PHONE_API_KEY;
	if (!openPhoneApiKey) {
		throw new Error('OPEN_PHONE_API_KEY is not set');
	}

	const contactsXhr = await fetch('https://api.openphone.com/v1/contacts', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: openPhoneApiKey,
		},
	});

	let { data: contacts, nextPageToken } = await contactsXhr.json();

	// Fetch all paginated contacts
	while (nextPageToken) {
		const nextContactsXhr = await fetch(`https://api.openphone.com/v1/contacts?pageToken=${nextPageToken}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: openPhoneApiKey,
			},
		});
		const nextContactsData = await nextContactsXhr.json();
		contacts = contacts.concat(nextContactsData.data);
		nextPageToken = nextContactsData.nextPageToken;
		console.log('Next page fetched:', contacts.length, 'contacts found');
	}

	console.log('Contacts fetched:', contacts.length, 'contacts found');
	console.table(
		contacts.map((contact: any) => {
			return {
				...contact.defaultFields,
				phone: contact.defaultFields.phoneNumbers.map((pn: any) => pn.value).join(', '),
				email: contact.defaultFields.emails.map((ea: any) => ea.value).join(', '),
			};
		})
	);

	return contacts;
}

export async function deleteContact(phone: string): Promise<any[]> {
	const openPhoneApiKey = process.env.OPEN_PHONE_API_KEY;
	if (!openPhoneApiKey) {
		throw new Error('OPEN_PHONE_API_KEY is not set');
	}

	const contactsXhr = await fetch('https://api.openphone.com/v1/contacts', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: openPhoneApiKey,
		},
	});

	let { data: contacts, nextPageToken } = await contactsXhr.json();

	// Fetch all paginated contacts
	while (nextPageToken) {
		const nextContactsXhr = await fetch(`https://api.openphone.com/v1/contacts?pageToken=${nextPageToken}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: openPhoneApiKey,
			},
		});
		const nextContactsData = await nextContactsXhr.json();
		contacts = contacts.concat(nextContactsData.data);
		nextPageToken = nextContactsData.nextPageToken;
		console.log('Next page fetched:', contacts.length, 'contacts found');
	}

	console.log('Contacts fetched:', contacts.length, 'contacts found');
	console.table(
		contacts.map((contact: any) => {
			return {
				...contact.defaultFields,
				phone: contact.defaultFields.phoneNumbers.map((pn: any) => pn.value).join(', '),
				email: contact.defaultFields.emails.map((ea: any) => ea.value).join(', '),
			};
		})
	);

	const toDelete: Promise<any>[] = await Promise.all(
		contacts
			.filter(
				(contact: {
					id: string;
					defaultFields: {
						phoneNumbers: {
							name: string;
							value: string;
						}[];
					};
				}) => {
					return contact.defaultFields.phoneNumbers.find((pn) => pn.value.endsWith(phone));
				}
			)
			.map((contact: { id: string }) => contact.id)
	);

	await Promise.all(
		toDelete.map((id) =>
			fetch(`https://api.openphone.com/v1/contacts/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: openPhoneApiKey,
				},
			})
		)
	);

	return toDelete;
}

export async function upsertContact(defaultFields: {
	company: string;
	firstName: string;
	lastName: string;
	role: string;
	externalId: string;
	phoneNumbers: {
		name: string;
		value: string;
	}[];
}): Promise<void> {
	const openPhoneApiKey = process.env.OPEN_PHONE_API_KEY;
	const userId = process.env.OPEN_PHONE_USER_ID;
	if (!openPhoneApiKey) {
		throw new Error('OPEN_PHONE_API_KEY is not set');
	}

	const contactsXhr = await fetch('https://api.openphone.com/v1/contacts', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: openPhoneApiKey,
		},
	});

	const { data: contacts } = await contactsXhr.json();
	const toDelete: Promise<any>[] = await Promise.all(
		contacts
			.filter(
				(contact: {
					id: string;
					defaultFields: {
						phoneNumbers: {
							name: string;
							value: string;
						}[];
					};
				}) => {
					return contact.defaultFields.phoneNumbers.find((pn) =>
						pn.value.endsWith(defaultFields.phoneNumbers[0].value)
					);
				}
			)
			.map((contact: { id: string }) => contact.id)
	);

	await Promise.all(
		toDelete.map((id) =>
			fetch(`https://api.openphone.com/v1/contacts/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: openPhoneApiKey,
				},
			})
		)
	);

	const body = JSON.stringify(
		{
			createdByUserId: userId,
			defaultFields,
		},
		null,
		2
	);
	const response = await fetch('https://api.openphone.com/v1/contacts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: openPhoneApiKey,
		},
		body,
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(`Failed to send message: ${errorData.message}`);
	} else {
		const successData = await response.json();
		console.log('Contact upserted successfully', successData);
	}
}
