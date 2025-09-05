import supabase from "@/utils/supabase/client";

export async function updateAttendance(team_calendar_id: string, athlete: string, is_going: boolean, status = 'invited') {
    const { data, error } = await supabase.from('team_attendance').update({ is_going, status }).eq('team_calendar_id', team_calendar_id).eq('athlete', athlete).select().single();
    if (error) {
        console.error('Error updating attendance:', error);
        return null;
    }
    return data;
}