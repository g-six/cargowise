'use client'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Strong, Text, TextLink } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
}

export default function RegisterForm() {
  return (
    <>
      <Field>
        <Label>Email</Label>
        <Input type="email" name="email" />
      </Field>
      <Field>
        <Label>Full name</Label>
        <Input name="name" />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input type="password" name="password" autoComplete="new-password" />
      </Field>
      <Button type="button" className="w-full" onClick={() => {
        
      }}>
        Create account
      </Button>
      <Text>
        Already have an account?{' '}
        <TextLink href="/login">
          <Strong>Sign in</Strong>
        </TextLink>
      </Text>
    </>
  )
}
