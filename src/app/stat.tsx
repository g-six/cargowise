'use client'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import Link from 'next/link';

export function Stat({ title, value, change, href }: { href?: string;title: string; value: string; change: string }) {
  return (
    <div role='button' className='relative'>
      <Divider />
      {
        href 
            ? <Link href={href} className="hover:text-lime-500 flex mt-6! text-lg/6 font-medium sm:text-sm/6 w-full justify-between"><span>{title}</span> <span>&rarr;</span></Link> 
            : <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      }
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}
