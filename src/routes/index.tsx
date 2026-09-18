import Header from '#/components/home/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
    </div>
  )
}
