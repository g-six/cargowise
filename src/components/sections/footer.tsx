import { Logo } from "@/app/logo"
import Image from "next/image";
import { PrivacyPolicyDialog } from "../dialogs/privacy-policy";

const footerNavigation = {
  parents: [
    { name: 'Parents Guide', href: '/parents' },
  ],
}
export default function FooterSection(p: { 'data-organization': { logo: string; name: string } }) {
    return <footer className="mt-32 sm:mt-56">
        <div className="mx-auto max-w-7xl border-t border-gray-200 px-6 py-16 sm:py-24 lg:px-8 lg:py-32 dark:border-white/10">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="flex">
                {p['data-organization'].logo ? <Image src={p['data-organization'].logo} alt={p['data-organization'].name} width={128} height={128} className="h-24 w-24 max-sm:hidden" /> : <Logo className='size-12' />}
                <img
                    alt="PDSL+"
                    src="https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/pdsl/pdsl.png"
                    width={192}
                    height={192}
                    className="max-h-24 w-full object-contain"
                />
            </div>
            <div className="mt-16 sm:grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Parent Resources</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.parents.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                        <li><PrivacyPolicyDialog data-organization={p['data-organization']} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer" /></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
}