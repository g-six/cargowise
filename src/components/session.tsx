'use client'

import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { Avatar } from "./avatar";
import { Dropdown, DropdownButton } from "./dropdown";
import { SidebarItem } from "./sidebar";
import { AccountDropdownMenu } from "@/app/(app)/application-layout";
import { useEffect, useState } from "react";

export default function SessionComponent() {
    const [data, setData] = useState<Record<string, any>>({});
    async function getUser(jwt: string = localStorage.getItem('access_token') || '') {
        const response = await fetch('/api/auth', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    }
    useEffect(() => {
        if (location && location?.hash) {
            new URLSearchParams(location.hash.slice(1)).forEach((value, key) => {
                localStorage.setItem(key, value);
            });
            
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            let toStore = {
                email: localStorage.getItem('email') || '',
                id: localStorage.getItem('id') || '',
                phone: localStorage.getItem('phone') || '',
                name: localStorage.getItem('name') || '',
            }
            getUser().then(({ user }) => {
                if (user) {
                    for (const key in user) {
                        if (Object.keys(toStore).includes(key)) {
                            localStorage.setItem(key, user[key]);
                            toStore = {
                                ...toStore,
                                [key]: user[key],
                            };
                        } else 
                        localStorage.removeItem(key);
                    }
                    setData(toStore);
                }
            }).catch(console.error);
        }
    }, [])
  return (
    <Dropdown>
        <DropdownButton as={SidebarItem}>
        <span className="flex min-w-0 items-center gap-3">
            <Avatar src="/users/erica.jpg" className="size-10" square alt="" />
            <span className="min-w-0">
            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white capitalize">{data.email?.split('@')?.shift()}</span>
            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                {data.email}
            </span>
            </span>
        </span>
        <ChevronUpIcon />
        </DropdownButton>
        <AccountDropdownMenu anchor="top start" />
    </Dropdown>
    
  );
}