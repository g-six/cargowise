'use client'

import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { Avatar } from "./avatar";
import { Dropdown, DropdownButton } from "./dropdown";
import { SidebarItem } from "./sidebar";
import AccountDropdownMenu from "./data-menu/account";

export default function SessionComponent({ data }: { data: Record<string, any> }) {
  return (
    <Dropdown>
        <DropdownButton as={SidebarItem}>
        <span className="flex min-w-0 items-center gap-3">
            <Avatar src={data.logo || "https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/logos/logo-sm.png"} className="w-10 h-8 pb-1.5 pt-0.5 px-1.5" square alt="" />
            <span className="min-w-0">
            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white capitalize">{data.first_name || data.email?.split('@')?.shift()}</span>
            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                {data.email}
            </span>
            </span>
        </span>
        <ChevronUpIcon />
        </DropdownButton>
        <AccountDropdownMenu anchor="top start" user={data} />
    </Dropdown>
    
  );
}