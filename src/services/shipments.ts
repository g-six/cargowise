import supabase from "@/utils/supabase/client";

export async function getShipmentJobs() {
	const { data, error } = await supabase.from('shipment_jobs').select('*').order('updated_at', { ascending: false })
	if (error) {
		console.warn('Error fetching shipments:', error)
		return []
	}
	return data
}

export async function filterShipments(filters: Record<string, any>) {
    const { job, shipment } = filters;
	const { data, error } = await supabase.from('shipment_jobs').select('*').ilike(job ? 'job' : 'shipment', `${job || shipment}%`).order('updated_at', { ascending: false })
	if (!data && error) {
		console.warn('Error fetching shipment:', error)
		return null
	}
	return data
}

export async function getShipment(shipment: string) {
	const { data, error } = await supabase.from('shipment_jobs').select('*').eq('shipment', shipment)
	if (!data && error) {
		console.warn('Error fetching shipment:', error)
		return null
	}
	return data.pop()
}

export async function getShipmentByJob(job: string) {
    console.log('Fetching shipment by job:', job)
	const { data, error } = await supabase.from('shipment_jobs').select('*').ilike('job', job)
	if (!data && error) {
		console.warn('Error fetching shipment:', error)
		return null
	}

	return data.pop()
}

export async function createShipment(data :{
    job: string;
    status?: string;
}) {
	const { data: record, error } = await supabase.from('shipment_jobs').insert(data).select('*').single()
	if (error) {
		console.warn('Error creating shipment:', error)
		return {
            error
        }
	}

	return record
}
export async function updateShipment(shipment: string, data :{
    latitude?: number;
    longitude?: number;
    status?: string;
}) {
	const { data: records, error } = await supabase.from('shipment_jobs').update({
        ...data,
        updated_at: new Date().toISOString(),
    }).eq('shipment', shipment).select('*')
    if (data.latitude && data.longitude && !isNaN(data.latitude) && !isNaN(data.longitude)) {
        await supabase.from('shipment_logs').insert({
            shipment,
            latitude: data.latitude,
            longitude: data.longitude,
        })

    }
	if (error) {
		console.warn('Error updating shipment:', error)
		return
	}

	return records.shift()
}

export async function getRecentShipmentLocation() {
	const { data, error } = await supabase.from('shipment_locations').select('*, shipments(*)').order('updated_at', { ascending: false }).limit(1)
	if (error) {
		console.warn('Error fetching shipment locations:', error)
		return []
	}
	return data
}


