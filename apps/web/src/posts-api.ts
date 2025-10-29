import { createServerFn } from '@tanstack/solid-start'
import { allPosts } from 'content-collections'

export type PostType = Awaited<ReturnType<typeof fetchPost>>

export const fetchPost = createServerFn({ method: 'GET' })
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => allPosts.find(post => post._meta.fileName === data)!)

export const fetchPosts = createServerFn({ method: 'GET' }).handler(async () => allPosts)
