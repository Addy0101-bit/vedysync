import Header from '#/components/home/header';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div>
      <Header />
      <div className="h-screen w-full">
        <h1 className="flex justify-center items-center h-full text-3xl font-bold text-zinc-900 dark:text-white">This is about page</h1>
      </div>
    </div>
  );
}
