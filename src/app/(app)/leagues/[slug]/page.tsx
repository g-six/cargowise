import { Button } from '@/components/button'
import { getLeague } from '@/services/leagues'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import PlanSelector from './plan-selector'

// export default async function LeaguePage() {
//     return (<>
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//         <FormHeader />
//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Fall League Page</h1>
//         <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
//             This is the Fall League page content.
//         </p>
//         </div>
//     </>
//     );
// }

export default async function LeaguePage(p: { params: Promise<{ slug: string }> }) {
	const { slug } = await p.params
	const { theme, organization, ...league } = await getLeague(slug)
    const pricing: Record<string, any>[] = league.pricing
    const cards: Record<string, any>[] = league.cards

	return (
		<div className="min-h-screen bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
			<div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
				{organization.logo ? (
					<Image src={organization.logo} alt={organization.name} width={100} height={100} className="mx-auto mb-6" />
				) : (
					<h2 className="text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">{organization.name}</h2>
				)}
				<p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
					{league?.name}
				</p>
				<div className={`mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-${pricing.length || 2}`}>
					<div className={`relative lg:row-span-${pricing.length || 2}`}>
						<div className="absolute inset-px rounded-lg max-lg:rounded-t-4xl bg-white lg:rounded-l-4xl dark:bg-gray-800" />
						<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
							<div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
								{`${cards?.[0]?.contents || '\nLeague Overview'}`.split('\n').filter(Boolean).map((line, index) => (
                                    <p className={
                                        index > 0 ? 'mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-justify dark:text-gray-400' : 'mt-2 text-lg font-medium tracking-tight text-gray-950 dark:text-white'
                                    } key={index}>
                                        {line}
                                    </p>
                                ))}

                                {`${cards?.[1]?.contents || '\nLeague Overview'}`.split('\n').filter(Boolean).map((line, index) => (
                                    <p className={
                                        index > 0 ? 'my-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400' : 'my-4 text-sm/6 font-medium tracking-tight text-gray-950 dark:text-white'
                                    } key={index}>
                                        {line}
                                    </p>
                                ))}
                                <br />
							</div>
						</div>
						<div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-l-4xl dark:outline-white/15" />
					</div>
                    {pricing?.map((card, lindex) => (<div key={lindex} className={`relative max-lg:row-start-${lindex + 2} lg:col-start-2` }>
						<div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
						<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
							<div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <div className='flex justify-between mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white'><span>{card.name}</span> <span>${card.fee} <small className='opacity-50 italic'>per {card.unit || 'child'}</small></span></div>
                                <p className='mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400'>
                                    {card.description ? `${card.description}`.split('\n').map((line, lidx) => (
                                        <span key={lidx}>
                                            {line}
                                            <br />
                                        </span>
                                    )) : 'Contact us for pricing'}
                                </p>
                                
                                <div className='mt-4 mb-10 flex justify-end'>
                                    <PlanSelector className='max-lg:w-full' color={theme.brand || 'rose'} data-price={card} />
                                </div>
							</div>
						</div>
						<div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
					</div>))}
					<div className={`relative ${pricing?.length ? `max-lg:row-start-${pricing?.length + 2}` : ''} lg:col-start-3 lg:row-start-1`}>
						<div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-4xl dark:bg-gray-800" />
						<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
							<div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                {`${cards?.[2]?.contents || '\nLeague Overview'}`.split('\n').filter(Boolean).map((line, lidx) => (
                                    <p className={
                                        lidx > 0 && cards?.[2]?.content_type === 'title and paragraph' ? 'my-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400' : 'mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white'
                                    } key={lidx}>
                                        {line}
                                    </p>
                                ))}
							</div>
							
						</div>
						<div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl dark:outline-white/15" />
					</div>
					

					<div className={`relative lg:row-start-${pricing.length} lg:col-start-3`}>
						<div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl dark:bg-gray-800" />
						<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
							<div className="p-8 sm:px-10 sm:py-10">
								<p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
									{`${league.description || '\nLeague Overview'}`.split('\n').filter(Boolean).pop()}
								</p>
							</div>
						</div>
						<div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:outline-white/15" />
					</div>
				</div>
			</div>
		</div>
	)
}
