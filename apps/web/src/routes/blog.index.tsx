import { createFileRoute } from '@tanstack/solid-router'
const PostsIndexComponent = () => <div>Select a post.</div>

export const Route = createFileRoute('/blog/')({ component: PostsIndexComponent })

