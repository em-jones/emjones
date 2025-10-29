import { createFileRoute } from '@tanstack/solid-router'
import Terminal from '~/components/Terminal'

const Home = () => {
  return (
    <div class="h-full flex flex-col lg:flex-row gap-4">
      <article class="w-full lg:w-1/2">
        <header>
          <h2 class="text-2xl md:text-5xl"># Em Jones</h2>
        </header>

        <h3 class="text-secondary text-lg md:text-xl">
          # Software Engineer and Architect
        </h3>
        <p>

        </p>
        <p>

        </p>
      </article>
      <aside class="w-full lg:w-1/2 flex-1 min-h-0">
        <Terminal />
      </aside>

    </div>
  )
}

export const Route = createFileRoute('/')({ component: Home })

