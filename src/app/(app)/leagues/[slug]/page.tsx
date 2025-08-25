import { getLeague } from '@/services/leagues'
import Image from 'next/image'
import Link from 'next/link'
import PlanSelector from './plan-selector'
import { TeamRegistrationForm } from './team-form'
import { Text } from '@/components/text'

export default async function LeaguePage(p: { params: Promise<{ slug: string }> }) {
	const { slug } = await p.params
	const { theme, organization, ...league } = await getLeague(slug)
	const pricing: Record<string, any>[] = league.pricing
	const cards: Record<string, any>[] = league.cards

	return (
		<div className="min-h-screen bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
            <span className='hidden row-start-2 row-span-2 grid-rows-2'></span>
            <span className='hidden row-start-3 row-span-3 grid-rows-3'></span>
            <span className='hidden row-start-4 row-span-4 grid-rows-4'></span>
            <span className='hidden row-start-5 row-span-5 grid-rows-5'></span>
            <span className='hidden row-start-6 row-span-6 grid-rows-6'></span>
            <span className='hidden row-start-7 row-span-7 grid-rows-7'></span>
            <span className='hidden row-start-8 row-span-8 grid-rows-8'></span>
            <span className='hidden row-start-9 row-span-9 grid-rows-9'></span>
            <span className='hidden row-start-10 row-span-10 grid-rows-10'></span>
            <span className='hidden row-start-11 row-span-11 grid-rows-11'></span>
            <span className='hidden row-start-12 row-span-12 grid-rows-12 grid-rows-13 grid-rows-14'></span>
			<div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
				{organization.logo ? (
					<Image src={organization.logo} alt={organization.name} width={100} height={100} className="mx-auto mb-6" />
				) : (
					<h2 className="text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">{organization.name}</h2>
				)}
				<p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
					{league?.name}
				</p>
				<div className={'mt-10 grid gap-y-4 lg:gap-x-4 max-lg:grid-cols-1 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2'}>
					<div className={`relative row-span-2 col-start-1`}>
						<div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-l-4xl dark:bg-gray-800" />
						<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            {cards?.map((card, cindex) => (<div className="px-8 pt-8 pb-3 sm:px-10 sm:pb-0" key={cindex}>
								{`${card.contents || '\nLeague Overview'}`
									.split('\n')
									.filter(Boolean)
									.map((line, lindex) => (
										<p
											className={
												lindex > 0
													? 'mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-justify dark:text-gray-300'
													: 'mt-2 text-lg font-bold tracking-tight text-gray-950 dark:text-white'
											}
											key={lindex}
										>
											{line}
										</p>
									))}
                                <br />
							</div>))}
						</div>
						<div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-l-4xl dark:outline-white/15" />
					</div>

					{pricing?.sort((a, b) => { return b.min_year - a.min_year }).slice(0, 2).map((card, lindex) => (
						<div
							key={lindex}
							className={`relative max-lg:row-start-${lindex + 2} lg:col-start-2 lg:row-start-${(lindex % 2) + 1}`}
						>
							<div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
							<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
								<div className="px-8 pt-8 sm:px-10 sm:pt-10 flex flex-col">
									<div className="mt-2 flex justify-between text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                                        <span>{card.name}</span>
									</div>
                                    <Text className='text-xs mb-2'>
                                        Players born from {card.min_year} to {card.max_year}
                                    </Text>
                                    {card.summary}
									{/* {card.description
										? `${card.description}`.split('\n').map((line, lidx) => {
												return (
													<p key={lidx} className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
														{line.split(' ').map((word, ii) => {
															if (word.startsWith('https://')) {
																const url = word
																const text = word.replace('https://', '')
																return (
																	<Link
																		key={ii}
																		href={('https://' + text.split(':').shift()) as string}
																		target="_blank"
																		className="underline decoration-dotted dark:text-white"
																		rel="noopener noreferrer"
																	>
																		{text.split(':').pop()}
																	</Link>
																)
															}
															return ` ${word} `
														})}
													</p>
												)
											})
										: 'Contact us for pricing'} */}
                            
                                    <PlanSelector className="max-lg:w-full" color={theme.brand || 'rose'} data-price={card} />
									
								</div>
							</div>
							<div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
						</div>
					))}

					{pricing?.sort((a, b) => { return b.min_year - a.min_year }).slice(2, 4).map((card, lindex) => (
						<div
							key={lindex}
							className={`relative max-lg:row-start-${lindex + 4} lg:col-start-3 lg:row-start-${(lindex % 2) + 1}`}
						>
							{lindex ? <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" /> : <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-4xl dark:bg-gray-800" />}
							<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
								<div className="px-8 pt-8 sm:px-10 sm:pt-10 flex flex-col">
									<div className="mt-2 flex justify-between text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                                        <span>{card.name}</span>
									</div>
                                    
                                    <Text className='text-xs mb-2'>
                                        Players born from {card.min_year} to {card.max_year}
                                    </Text>
                                    {card.summary}
									{/* {card.description
										? `${card.description}`.split('\n').map((line, lidx) => {
												return (
													<p key={lidx} className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
														{line.split(' ').map((word, ii) => {
															if (word.startsWith('https://')) {
																const url = word
																const text = word.replace('https://', '')
																return (
																	<Link
																		key={ii}
																		href={('https://' + text.split(':').shift()) as string}
																		target="_blank"
																		className="underline decoration-dotted dark:text-white"
																		rel="noopener noreferrer"
																	>
																		{text.split(':').pop()}
																	</Link>
																)
															}
															return ` ${word} `
														})}
													</p>
												)
											})
										: 'Contact us for pricing'} */}
                            
                                    <PlanSelector className="max-lg:w-full" color={theme.brand || 'rose'} data-price={card} />
								</div>
							</div>
							{lindex
                                ? <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
                                : <div className="pointer-events-none absolute inset-px rounded-lg lg:rounded-tr-4xl shadow-sm outline outline-black/5 dark:outline-white/15" />
                            }
						</div>
					))}

					<div className={`relative lg:col-span-3 lg:row-start-3`}>
						<div className="absolute inset-px bg-lime-600 rounded-4xl" />
						<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
							<div className="p-8 sm:px-10 sm:py-10">
								<p className="mt-2 text-lg lg:text-2xl font-medium lg:font-bold tracking-tight text-gray-950 max-lg:text-center">
									{`${league.description || '\nLeague Overview'}`.split('\n').filter(Boolean).pop()}
								</p>
							</div>
						</div>
						<div className="pointer-events-none absolute inset-px rounded-4xl shadow-sm outline outline-black/5 dark:outline-white/15" />
					</div>
					<div className={`relative lg:col-start-3 max-lg:hidden lg:row-start-2`}>
						<div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl dark:bg-gray-800" />
						<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
							<div className="p-8 sm:px-10 sm:py-10">
								<TeamRegistrationForm />
							</div>
						</div>
						<div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:outline-white/15" />
					</div>
				</div>
			</div>
		</div>
	)
}
