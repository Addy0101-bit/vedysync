import { createFileRoute, Link } from '@tanstack/react-router'
import { requireMaker } from '#/lib/auth.middleware'
import { MakerOnboardingForm } from '#/components/maker/MakerOnboardingForm'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export const Route = createFileRoute('/onboarding/maker/')({
  beforeLoad: async () => {
    const { session } = await requireMaker();
    return { session };
  },
  validateSearch: (search: Record<string, unknown>): { step?: number } => {
    return {
      step: search.step !== undefined ? Number(search.step) : undefined,
    }
  },
  component: MakerOnboarding,
})

function MakerOnboarding() {
  const { session } = Route.useRouteContext()
  const search = Route.useSearch()
  const step = search.step ?? 0
  const navigate = Route.useNavigate()

  const handleStepChange = (newStep: number) => {
    navigate({ search: { step: newStep }, replace: true })
  }

  if (session.user.verificationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
          <div className="w-96 h-96 mb-6 mx-auto">
            <DotLottieReact src="/animations/Verify.lottie" autoplay loop />
          </div>
          <div className='flex flex-col items-center justify-center -mt-16'>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Document Under Review</h1>
            <p className="text-zinc-500 max-w-md mb-8">
              We have received your documents and they are currently being reviewed by our team. This process usually takes 24-48 hours. We'll notify you once your account is verified.
            </p>
          </div>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-500 transition-colors shadow-md shadow-blue-900/20">
            Back to Home
          </Link>
        </div>
      </div>
    )
  } if (session.user.verificationStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
          <div className="w-96 h-96 mb-6 mx-auto">
            <DotLottieReact src="/animations/cross.json" autoplay />
          </div>
          <div className='flex flex-col items-center justify-center -mt-16'>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Document Rejected</h1>
            <p className="text-zinc-500 max-w-md mb-8">
              We have rejected your documents. Please resubmit the documents. Please contact our team for any queries.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-4'>
            <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-500 transition-colors shadow-md shadow-blue-900/20">
              Back to Home
            </Link>

            <Link to="/contact" className='hover:underline hover:text-blue-500'>
              Have Any Doubts? Contact Us
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 relative overflow-hidden selection:bg-blue-500/30">
      {/* Horizontal Lines */}
      <div className="absolute top-[5vh] lg:top-[10vh] left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800/80" />
      <div className="absolute top-[calc(5vh+2rem)] lg:top-[calc(10vh+3rem)] left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800/80" />
      <div className="absolute bottom-[calc(5vh+2rem)] lg:bottom-[calc(10vh+3rem)] left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800/80" />
      <div className="absolute bottom-[5vh] lg:bottom-[10vh] left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800/80" />

      {/* Vertical Lines */}
      <div className="absolute left-[5vw] lg:left-[33vw] top-0 w-px h-full bg-zinc-200 dark:bg-zinc-800/80" />
      <div className="absolute left-[calc(5vw+2rem)] lg:left-[calc(33vw+3rem)] top-0 w-px h-full bg-zinc-200 dark:bg-zinc-800/80" />
      <div className="absolute right-[calc(5vw+2rem)] lg:right-[calc(33vw+3rem)] top-0 w-px h-full bg-zinc-200 dark:bg-zinc-800/80" />
      <div className="absolute right-[5vw] lg:right-[33vw] top-0 w-px h-full bg-zinc-200 dark:bg-zinc-800/80" />

      {/* The Filled Content Area */}
      <div className="absolute top-[calc(5vh+2rem)] lg:top-[calc(10vh+3rem)] bottom-[calc(5vh+2rem)] lg:bottom-[calc(10vh+3rem)] left-[calc(5vw+2rem)] lg:left-[calc(33vw+3rem)] right-[calc(5vw+2rem)] lg:right-[calc(33vw+3rem)] bg-white dark:bg-[#0c0c0c] z-10 flex flex-col p-6 lg:p-12 overflow-visible shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-900">
        <MakerOnboardingForm step={step} setStep={handleStepChange} />
      </div>
    </div>
  )
}
