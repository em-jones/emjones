import { createFileRoute } from '@tanstack/solid-router'
const PostsIndexComponent = () => <h2>Em Jones's Projects</h2>

export const Route = createFileRoute('/projects/')({ component: PostsIndexComponent })


