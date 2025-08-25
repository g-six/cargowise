import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "How often are matches?",
    answer:
      "Most games are scheduled on weekends. You’ll receive exact times/venues after registering interest.",
  },
  {
    question: 'What ages and levels are accepted?',
    answer:
      'We accept players aged 6-17. Tailored for beginners to advanced players - all skill levels are welcome!',
  },
  {
    question: 'Which league should my child join?',
    answer:
      'Start with PDSL for beginners/recreational. If your player has strong fundamentals, is physically ahead of their peers, and wants more challenge, PDSL+ is ideal.',
  },
  {
    question: 'I already belong to another league. Can I still join?',
    answer:
      "Yes! We welcome players from all leagues and our schedule is flexible.",
  },
  {
    question: "How many teams do you compete against?",
    answer:
      'We typically compete against 3-5 teams per age group and level in our league. This allows for a balanced schedule and plenty of playing time for all participants.',
  },
  {
    question: "Where do you train?",
    answer:
      'We train at various locations depending on the age group and level. Our primary location is at Cambridge Elementary.',
  },
]

export default function FaqSection() {
	return (
		<div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
					Frequently asked questions
				</h2>
				<dl className="mt-16 divide-y divide-gray-900/10 dark:divide-white/10">
					{faqs.map((faq) => (
						<Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
							<dt>
								<DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
									<span className="text-base/7 font-semibold">{faq.question}</span>
									<span className="ml-6 flex h-7 items-center">
										<PlusIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
										<MinusIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
									</span>
								</DisclosureButton>
							</dt>
							<DisclosurePanel as="dd" className="mt-2 pr-12">
								<p className="text-base/7 text-gray-600 dark:text-gray-400">{faq.answer}</p>
							</DisclosurePanel>
						</Disclosure>
					))}
				</dl>
			</div>
		</div>
	)
}
