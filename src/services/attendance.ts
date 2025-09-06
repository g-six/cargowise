import supabase from "@/utils/supabase/client";
import { sendTextMessage } from "./open-phone";

export async function updateAttendance(team_calendar_id: string, athlete: string, is_going: boolean, status = 'invited') {
    const { data, error } = await supabase.from('team_attendance').update({ is_going, status }).eq('team_calendar_id', team_calendar_id).eq('athlete', athlete).select().single();
    if (error) {
        console.error('Error updating attendance:', error);
        return null;
    }
    return data;
}

export async function getAttendanceRecord(team_calendar_id: string, athlete?: string) {
    const { data, error } = await supabase.from('team_attendance').select('*, athlete(slug, first_name), team_calendar(title, start_date, start_time, duration_minutes, team(name))').eq('team_calendar_id', team_calendar_id);
    if (error) {
        console.error('Error updating attendance:', error);
        return null;
    }
    return data?.map(record => {
        const { team_calendar: { team, ...team_calendar }, athlete, ...rest } = record;
        return {
            ...rest,
            athlete: athlete?.slug,
            first_name: athlete?.first_name,
            ...team_calendar,
            team: team?.name || '',
        }
    });
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
    const { data: existingRecord } = await supabase.from('team_calendar').select('*, team(name, team_athletes(athlete(slug,organization_members(users(email,phone)))))').eq('team', team).eq('start_date', start_date).eq('start_time', `${start_time}${start_time.length === 5 ? ':00' : ''}`).single();
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
    }).select('*, team(name, team_athletes(athlete(slug,organization_members(users(email,phone)))))').single();
    if (error) {
        console.error('Error creating attendance record:', error);
        return null;
    }

    const tobe_notified: { email: string; phone: string; athlete: string }[] = []
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
                        let phone = (member.phone || '').split('').filter(c => '+0123456789'.includes(c)).join('')
                        tobe_notified.push({
                            email: member.email,
                            phone: phone.startsWith('+') ? phone : '+1' + phone,
                            athlete: ta.athlete.slug,
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
        const results = await Promise.all(tobe_notified.map(member => {
            return [
                Promise.resolve(member.email),
                member.email.includes('echiverri') ?
                sendTextMessage(member.phone, `${data.team.name} ${title} on ${start_date} at ${start_time}. To confirm attendance, visit: https://clubathletix.com?et=${data.id}&a=${member.athlete}`)
                : Promise.resolve(member.phone),
            ]
        }).flat());
        return {
            ...data,
            team_attendance,
        }
    }

    return data;
}