export default function RegistrationStepPage({
  params,
}: {
  params: { step: string }
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Registration Step: {params.step}</h1>
      {/* Step-specific form will go here */}
    </div>
  )
}
