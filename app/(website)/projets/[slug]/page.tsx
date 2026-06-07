import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma/prisma"
import type { Metadata } from "next"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const project = await prisma.project.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!project) {
    return {
      title: "Projet introuvable",
    }
  }

  return {
    title: project.title,
    description: project.description.slice(0, 155),
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 155),
      type: "article",
    },
  }
}

export default async function ProjetDetailPage({ params }: Props) {
  const { slug } = await params

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      category: true,
      images: true,
    },
  })

  if (!project) {
    notFound()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  const coverImageUrl = `${supabaseUrl}/storage/v1/object/public/images-bigbang/${project.coverImage}`

  const images = project.images.map((image) => ({
    ...image,
    url: `${supabaseUrl}/storage/v1/object/public/images-bigbang/${image.url}`,
  }))

  return (
    <main className="mx-auto max-w-6xl px-4 py-24">
      <p className="mb-2 text-sm font-medium text-blue-600">
        {project.category.name}
      </p>

      <h1 className="mb-6 text-4xl font-bold text-gray-900">
        {project.title}
      </h1>

      <div className="mb-8 w-full overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={coverImageUrl}
          alt={project.title}
          width={1400}
          height={900}
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <p className="mb-10 text-lg leading-8 text-gray-700">
        {project.description}
      </p>

      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Galerie du projet
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {images.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-xl bg-gray-100"
          >
            <Image
              src={image.url}
              alt={project.title}
              width={900}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>
    </main>
  )
}