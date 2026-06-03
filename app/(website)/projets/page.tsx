import { prisma } from "@/lib/prisma/prisma"
import ProjetsView from "@/components/projetsView"

type Props = {
  searchParams: {
    category?: string
  }
}

export default async function ProjetsPage({ searchParams }: Props) {
  const selectedCategory = searchParams.category

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const projects = await prisma.project.findMany({
    where: selectedCategory
      ? {
          category: {
            name: selectedCategory,
          },
        }
      : {},
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const projectsWithUrls = projects.map((project) => ({
  ...project,
  coverImage: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images-bigbang/${project.coverImage}`,
}))

  return (
    <ProjetsView
       projects={projectsWithUrls}
       categories={categories}
    />
  )
}