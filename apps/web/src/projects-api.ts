import { createServerFn } from '@tanstack/solid-start'
import { allProjects } from 'content-collections'

export type ProjectType = Awaited<ReturnType<typeof fetchProject>>

export const fetchProject = createServerFn({ method: 'GET' })
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => allProjects.find(post => post._meta.fileName === data)!)
export const fetchProjects = createServerFn({ method: 'GET' }).handler(async () => allProjects)
