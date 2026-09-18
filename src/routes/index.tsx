import Header from '#/components/home/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <h1>
        Adarsh is here as contributer!
      </h1>
    </div>
  )
}
