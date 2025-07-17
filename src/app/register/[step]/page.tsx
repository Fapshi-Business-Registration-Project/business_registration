import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Registration Step',
  description: 'Complete your business registration step by step',
}

type Props = {
  params: {
    step: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function RegistrationStepPage({
  params,
}: Props) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Registration Step: {params.step}</h1>
      {/* Step-specific form will go here */}
    </div>
  )
}
