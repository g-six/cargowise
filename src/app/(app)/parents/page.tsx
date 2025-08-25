import { Heading, Subheading } from '@/components/heading';
import { Text } from '@/components/text';
import { LockClosedIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/20/solid';

export default function ParentalExpectationsPage() {
	return (
		<section className="relative mx-auto container">
			<div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 md:max-w-none lg:mx-0 lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-y-10">
					<div className="lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:gap-x-8 lg:px-8">
						<div className="lg:pr-4">
							<Heading>A guide to a better development experience</Heading>

							<Subheading>
								Parental Expectations
							</Subheading>

							<Text>
								In order to obtain optimal success, it is necessary for the coaching staff to be in complete control of
								the athlete&rsquo;s performance. In order to do so, we need the full cooperation and support from the parents.
								We are dealing with your child and the team on a daily basis and hold them accountable in each and every
								soccer situation.
							</Text>
						</div>
					</div>
					<div className="-mt-12 text-zinc-700 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden lg:px-12 lg:py-12">
						<Text>
							Unfortunately, addressing individual concerns is sometimes at the expense of the entire team. Please put
							the team and the coach first by setting an appointment 24 hours after the event.
                            <br />
                            <br />
							Following these simple suggestions will help give your child a better and more meaningful experience in
							the game. College coaches who are looking for players for their programs tell us regularly that they are
							observing your character and behavior during games and after. They consider it a major part of the
							decision-making process in choosing one player over another if they feel they will have to “deal” with
							that parent for 4 years. So like your sons/daughters everyone is being watched even when you don’t think
							so.
						</Text>
					</div>
					<div className="grid-cols-2 space-y-8 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:grid-cols-1 lg:gap-x-8 lg:gap-y-8 lg:px-8">
						<div className="text-base/7 text-gray-700 lg:pr-4">
							<ul role="list" className="space-y-8 text-gray-600">
								<li className="flex gap-x-3">
									<UsersIcon aria-hidden="true" className="mt-1 size-5 flex-none" />

									<span>
										<strong className="font-semibold text-black dark:text-white">Allow your child to play on their own.</strong>{' '}
										Please encourage your child to take responsibility for their own actions, rather than intervening
										yourself. Ask your child to address his/her concerns directly with the coaching staff. This develops
										them as individuals, holds them accountable for their own actions, and promotes maturity.
									</span>
								</li>
								<li className="flex gap-x-3">
									<UserGroupIcon aria-hidden="true" className="mt-1 size-5 flex-none" />
									<span>
										<strong className="font-semibold text-black dark:text-white">Respect the team.</strong> At no time is it
										appropriate to discuss other players’ performance to other players or parents on the team. Your own
										expectations and goals may differ from that of your child, please keep this in mind.
									</span>
								</li>
							</ul>
						</div>
						<div className="text-base/7 text-gray-700 lg:pr-4">
							<ul role="list" className="space-y-8 text-gray-600">
								<li className="flex gap-x-3">
									<LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none" />
									<p>
										<strong className="font-semibold text-black dark:text-white">24-hour cool down period.</strong> If you feel the
										need to intervene, please allow <strong className="font-semibold text-red-700">24 hours</strong>{' '}
										after a match before approaching a staff coach to discuss your child’s performance. The coaches are
										the most invested people in the matches and this is an emotional time for everyone. We find that 24
										hours allows for cooler heads to prevail and promotes a more productive dialog. This applies to
										tournaments when coaches are inundated with logistical demands of scouting, prepping for next match
										and dealing with meals and other administrative concerns.
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
