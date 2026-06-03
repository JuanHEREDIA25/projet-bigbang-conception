import { prisma } from "@/lib/prisma/prisma"
import { notFound } from "next/navigation"
import ProjectEditForm from "@/components/admin/projectEditForm"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params

  const projectId = Number(id)

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      category: true,
      images: true,
    },
  })

  if (!project) {
    notFound()
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

  const projectWithUrls = {
    ...project,
    coverImageUrl: `${supabaseUrl}/storage/v1/object/public/images-bigbang/${project.coverImage}`,
    images: project.images.map((image) => ({
      ...image,
      imageUrl: `${supabaseUrl}/storage/v1/object/public/images-bigbang/${image.url}`,
    })),
  }

  return (
    <main className="p-6">
      <ProjectEditForm project={projectWithUrls} categories={categories} />
    </main>
  )
}