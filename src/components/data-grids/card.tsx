'use client'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import Link from 'next/link';

export default function Card({ title, contents, href }: { href?: string; title: string; contents: string; }) {
  return (
    <div role='button' className='relative rounded-lg bg-black/10 p-4 hover:bg-black/40 cursor-pointer' onClick={() => {
        if (href) {
          window.location.href = href;
        }
    }}>
      {
        href
          ? <Link href={href} className="hover:text-lime-500 flex text-lg/6 font-medium sm:text-sm/6 w-full justify-between"><span>{title}</span> <span>&rarr;</span></Link>
          : <div className="text-lg/6 font-medium sm:text-sm/6">{title}</div>
      }
      <div className="mt-2 text-3xl/8 font-semibold sm:text-2xl/8">{contents}</div>
    </div>
  )
}