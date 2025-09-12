'use client'
import { Heading } from "@/components/heading";
import { Stream } from "@cloudflare/stream-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function MatchVideoPage() {
    const params = useParams()
    const { slug } = params

    return <section id="match-video" className="rounded-2xl overflow-hidden mt-14 relative aspect-video max-h-[60vh] h-screen w-full bg-black">
        <Stream controls src={slug as string} startTime={39} />
        <div className="bg-black h-14 rounded-xl bottom-2 absolute flex items-center gap-2 p-4 right-2">
            <Image src="https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/logos/logo.png" alt="ClubAthletix" width={36} height={36} />
            <Heading level={3} force="text-2xl! font-bold!">CLUBATHLETIX</Heading>
        </div>
    </section>
}