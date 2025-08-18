'use client'

import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { Avatar } from "./avatar";
import { Dropdown, DropdownButton } from "./dropdown";
import { SidebarItem } from "./sidebar";
import { AccountDropdownMenu } from "@/app/(app)/application-layout";
import { useEffect, useState } from "react";

export default function SessionComponent({ data }: { data: Record<string, any> }) {
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