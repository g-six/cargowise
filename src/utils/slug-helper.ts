export function slugifyAthlete(p: {
    last_name: string;
    first_name: string;
    number?: number;
    date_of_birth?: string;
}) {
    let slug = p.first_name.toLowerCase()
		slug = slug + ' ' + p.last_name.toLowerCase()
		slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        if (p.number) {
            slug = slug + '-' + p.number
        }
        else if (p.date_of_birth) {
            const dob = new Date(p.date_of_birth)
            if (!isNaN(dob.getTime())) {
                slug = slug + '-' + p.date_of_birth.split('-').pop()
            }
        }
		slug = slug.trim().replace(/\s+/g, '-')
        slug = slug.replace(/[^a-z0-9-]/gi, '')
	return slug.toLowerCase()
}

export function normalizeText(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}