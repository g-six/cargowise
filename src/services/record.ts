import supabase from "@/utils/supabase/client";

export async function createRecord<T>(table: string, record: T): Promise<T | null> {
    const { data, error } = await supabase.from(table).upsert(record).select('*, athlete(*)').single();
    if (error) {
        console.error('Error creating record:', error);
        return null;
    }
    return data;
}

export async function updateRecord<T>(table: string, record: T): Promise<T | null> {
    const { slug, id } = record as any;
    if (slug) {
        const { data, error } = await supabase.from(table).update(record).eq('slug', slug).select().single();
        if (error) {
            console.error('Error creating record:', error);
            return null;
        }
        return data;
    }
    if (id) {
        const { data, error } = await supabase.from(table).update(record).eq('id', id).select().single();
        if (error) {
            console.error('Error creating record:', error);
            return null;
        }
        return data;
    }
    console.error('Error updating record: no id or slug provided');
    return null;
}