'use client'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { data } from 'framer-motion/client'
import { useState } from 'react'
import { Subheading } from '../heading'
import { Text } from '../text'

export function PrivacyPolicyDialog(props: { className?: string; 'data-organization'?: { logo: string; name: string } }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <span role='button' className={props.className} onClick={() => setIsOpen(true)}>
        Privacy Policy
      </span>
      <Dialog open={isOpen} onClose={setIsOpen} size='2xl'>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogDescription>
          {props['data-organization']?.name} is committed to protecting the privacy of our players, parents, and visitors. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
        </DialogDescription>
        <DialogBody>
          <Subheading>1. Information We Collect</Subheading>
          <div className='text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400'>
            We may collect the following types of information when you visit our website or register for academy programs:<br />
            <ul className='list-disc pl-5'>
                <li>Personal Information: Parent/guardian names, child&rsquo;s name, date of birth, contact details (email, phone number, address).</li>
                <li>Registration & Payment Details: Emergency contact info, medical notes you provide, and payment details (handled securely by our payment processor).</li>
                <li>Website Usage Data: Information such as IP address, browser type, and pages visited to help improve our website.</li>
            </ul>
          </div>


          <Subheading className='mt-6'>2. How We Use Your Information</Subheading>
          <div className='text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400'>
            We use the information collected to:
            <ul className='list-disc pl-5'>
                <li>Register players for training, leagues, and events.</li>
                <li>Communicate with parents/guardians about schedules, updates, and academy news.</li>
                <li>Ensure player safety, including emergency contact and medical considerations.</li>
                <li>Process payments securely.</li>
                <li>Improve our website and services.</li>
            </ul>
            We do not sell, rent, or trade your personal information to third parties.
          </div>

          <Subheading className='mt-6'>3. Sharing Your Information</Subheading>
          <div className='text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400'>
            We may share limited information only in the following cases:
            <ul className='list-disc pl-5'>
                <li>With Service Providers: Payment processors, registration platforms, or communication tools that help us run our programs.</li>
                <li>As Required by Law: If disclosure is necessary to comply with legal obligations or protect the rights and safety of our players and staff.</li>
                <li>With Your Consent: For example, if you agree to your child&rsquo;s photos being used for promotional purposes.</li>
            </ul>
          </div>

          <Subheading className='mt-6'>4. Photos &amp; Media</Subheading>
          <Text>
            We may collect and use photos and videos of participants in our programs for promotional purposes. We will obtain consent from parents/guardians before using any media featuring their children.
          </Text>

          <Subheading className='mt-6'>5. Data Security</Subheading>
          <Text>
            We take reasonable steps to protect your personal information, including secure storage, password-protected systems, and SSL encryption on our website.
          </Text>

          <Subheading className='mt-6'>6. Children&rsquo; Privacy</Subheading>
          <Text>
            Since our programs involve youth participants, we require parent/guardian consent for all personal information shared with us. We do not knowingly collect data directly from children under 13 without parental involvement.
          </Text>

          <Subheading className='mt-6'>7. Your Rights</Subheading>
          <Text>Parents and guardians may:<br />
            •	Request access to the information we hold.<br />
            •	Ask for corrections to inaccurate information.<br />
            •	Request deletion of personal information, where legally allowed.
          </Text>
          
          <Subheading className='mt-6'>8. Cookies &amp; Website Tracking</Subheading>
          <Text>
            Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though some features may not function properly.
          </Text>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Refund</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}