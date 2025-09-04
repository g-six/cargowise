import Link from "next/link"
import { Text } from "../text"
import { Heading } from "../heading"
import { SignupForm } from "../dialogs/signup"
import { OrganizationSignupForm } from "../dialogs/organization-signup"

export default function HeroSection(p: {
    'data-organization': Record<string, any>
}) {
	return (
		<div className="relative isolate overflow-hidden pb-16 sm:pb-20">
            <div className="w-[calc(100dvw+10rem)] bg-[url(/hero-bg.jpg)] absolute inset-0 -z-10 size-full object-cover" />
            <div className="w-[calc(100dvw+10rem)] bg-gray-900/90 absolute inset-0 -z-10 size-full object-cover" />
			<div
				aria-hidden="true"
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
				/>
			</div>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl py-32 sm:pt-48 lg:pt-56">
					{Boolean(p["data-organization"]?.announcements?.length) && <div className="hidden sm:mb-8 sm:flex sm:justify-center">
						<div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
							{p["data-organization"]?.announcements[0].contents}{' '}
							{Boolean(p["data-organization"]?.announcements[0].link) && <Link href={p["data-organization"]?.announcements[0].link} className={`font-semibold text-${p["data-organization"]?.theme.brand}-600 dark:text-${p["data-organization"]?.theme.brand}-400`}>
								<span aria-hidden="true" className="absolute inset-0" />
								<span className="sr-only">More info</span> <span aria-hidden="true">&rarr;</span>
							</Link>}
						</div>
					</div>}
					<div className="text-center">
                        {`${p["data-organization"].hero_title || 'Welcome to ClubAthletix'}`.split('\n').map((line, index) => (
                            <Heading key={index} level={2} className="text-3xl! sm:text-4xl!">
                                {line}
                            </Heading>
						))}
						<Text className="mt-8 text-xl!">
							{p["data-organization"]?.hero_subtitle || 'Join us today and take the first step towards achieving your athletic dreams.'}
						</Text>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							{p["data-organization"]?.has_registration ? (
								<SignupForm data-organization={p["data-organization"] as any} />
							) : (
								<OrganizationSignupForm data-organization={p["data-organization"] as any} />
							)}
						</div>
					</div>
				</div>

				{/* Logo cloud */}
                {/* <Text className="mx-auto text-center">Leagues we play in</Text>
                <Link href='https://thepdsl.ca'>
                    <img
                        alt="PDSL+"
                        src="https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/pdsl/pdsl.png"
                        width={192}
                        height={192}
                        className="max-h-36 w-full object-contain"
                    />
                </Link> */}
			</div>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
				/>
			</div>
		</div>
	)
}
