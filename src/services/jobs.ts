import supabase from "@/utils/supabase/client";

export async function getJobOrders() {
	const { data, error } = await supabase.from('jobs').select('*, shipments(*)')
	if (error) {
		console.warn('Error fetching job orders:', error)
		return []
	}
	return data
}
export async function createJobOrder({
    id,
    shipment,
} :{
    id: string;
    shipment: string;
}) {
	const { data, error } = await supabase.from('jobs').insert({
		id,
	}).select('*').single()
	if (error) {
		console.warn('Error creating job order:', error)
		return []
	}
	return data
}
