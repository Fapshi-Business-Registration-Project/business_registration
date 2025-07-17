import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Registration Step',
  description: 'Complete your business registration step by step',
}

type Props = {
  params: Promise<{
    step: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function RegistrationStepPage({
  params,
}: Props) {
  const { step } = await params
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Registration Step: {step}</h1>
      {/* Step-specific form will go here */}
    </div>
  )
}