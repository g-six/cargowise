import Link from "next/link"
import { Button } from "../button"

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
				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
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
                        {`${p["data-organization"].hero_title || 'Welcome to CargoWise'}`.split('\n').map((line, index) => (
                            <h1 key={index} className="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white text-pretty">
                                {line}
                            </h1>
						))}
						<p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat
							veniam occaecat.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Button
								href="#"
								color={p["data-organization"]?.theme.brand}
							>
								Get started
							</Button>
							<a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
								Learn more <span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</div>

				{/* Logo cloud */}
				<div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
					<img
						alt="Transistor"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden"
					/>
					<img
						alt="Transistor"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1"
					/>

					<img
						alt="Reform"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden"
					/>
					<img
						alt="Reform"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1"
					/>

					<img
						alt="Tuple"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:hidden"
					/>
					<img
						alt="Tuple"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain not-dark:hidden lg:col-span-1"
					/>

					<img
						alt="SavvyCal"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 dark:hidden"
					/>
					<img
						alt="SavvyCal"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg"
						width={158}
						height={48}
						className="col-span-2 max-h-12 w-full object-contain not-dark:hidden sm:col-start-2 lg:col-span-1"
					/>

					<img
						alt="Statamic"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
						width={158}
						height={48}
						className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 dark:hidden"
					/>
					<img
						alt="Statamic"
						src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg"
						width={158}
						height={48}
						className="col-span-2 col-start-2 max-h-12 w-full object-contain not-dark:hidden sm:col-start-auto lg:col-span-1"
					/>
				</div>
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
