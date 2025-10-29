import { redirect, createFileRoute } from '@tanstack/solid-router'

const beforeLoad = async () => { throw redirect({ to: '/blog' }) }
export const Route = createFileRoute('/redirect')({ beforeLoad })
