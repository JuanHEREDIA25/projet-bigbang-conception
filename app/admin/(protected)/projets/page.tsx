import { prisma } from "@/lib/prisma/prisma"
import AdminProjectsView from "@/components/admin/projectsViewAdmin"

type Props = {
  searchParams: {
    created?: string
    deleted?: string
  }
}

export default async function AdminProjectsPage({ searchParams }: Props) {
  const projects = await prisma.project.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  const projectsWithUrls = projects.map((project) => ({
    ...project,
    coverImage: `${supabaseUrl}/storage/v1/object/public/images-bigbang/${project.coverImage}`,
  }))

  return (
    <AdminProjectsView
      projects={projectsWithUrls}
      created={searchParams.created === "1"}
      deleted={searchParams.deleted === "1"}
    />
  )
}