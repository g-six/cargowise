import supabase from "@/utils/supabase/client";

export async function updateAttendance(team_calendar_id: string, athlete: string, is_going: boolean, status = 'invited') {
    const { data, error } = await supabase.from('team_attendance').update({ is_going, status }).eq('team_calendar_id', team_calendar_id).eq('athlete', athlete).select().single();
    if (error) {
        console.error('Error updating attendance:', error);
        return null;
    }
    return data;
}


export async function createAttendance({
    title,
    athlete,
    team,
    start_date,
    start_time,
    duration_minutes,
    location,
    is_going,
    status = 'invited'
}: {
    title: string;
    team: string;
    start_date: string;
    start_time: string;
    duration_minutes: number;
    location: string;
    athlete?: string;
    is_going?: boolean;
    status?: string;
}) {
    const { data: existingRecord } = await supabase.from('team_calendar').select('*, team(team_athletes(athlete(slug,organization_members(users(email,phone)))))').eq('team', team).eq('start_date', start_date).eq('start_time', `${start_time}${start_time.length === 5 ? ':00' : ''}`).single();
    if (existingRecord) {
        console.warn('Attendance record already exists for this event and team.');
        return existingRecord;
    }
    const { data, error } = await supabase.from('team_calendar').insert({
        title,
        team,
        start_date,
        start_time,
        duration_minutes,
        location
    }).select('*, team(team_athletes(athlete(slug,organization_members(users(email,phone)))))').single();
    if (error) {
        console.error('Error creating attendance record:', error);
        return null;
    }

    const tobe_notified: { email: string; phone: string }[] = []
    if (data.team?.team_athletes?.length) {
        const { data: team_attendance } = await supabase.from('team_attendance').upsert(data.team.team_athletes.map((
            ta: {
                athlete: {
                    slug: string,
                    organization_members: {
                        users:{
                            email: string,
                            phone: string,
                        }
                    }[]
                }
            }) => {
            if (ta.athlete?.organization_members?.length) {
                for (const om of ta.athlete.organization_members) {
                    const member = om.users
                    if (!member?.email) continue;
                    const idx = tobe_notified.findIndex(tn => tn.email === member.email)
                    if (idx === -1) {
                        tobe_notified.push({
                            email: member.email,
                            phone: member.phone.startsWith('+') ? member.phone : '+1' + member.phone
                        })
                    }
                }
            }
            return {
                team_calendar_id: data.id,
                athlete: ta.athlete.slug,
                is_going,
                status
            }
        })).select('*');
        console.table(tobe_notified)
        console.table(team_attendance)
        return {
            ...data,
            team_attendance,
        }
    }

    return data;
}