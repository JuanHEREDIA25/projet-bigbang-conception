import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma/prisma"

type Props = {
  params: {
    slug: string
  }
}

export default async function ProjetDetailPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      category: true,
      images: true,
    },
  })

  if (!project) {
    notFound()
  }

  const coverImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images-bigbang/${project.coverImage}`

  const images = project.images.map((image) => ({
    ...image,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images-bigbang/${image.url}`,
  }))

  return (
    <main className="mx-auto max-w-6xl px-4 py-24">
      <p className="mb-2 text-sm font-medium text-blue-600">
        {project.category.name}
      </p>

      <h1 className="mb-6 text-4xl font-bold text-gray-900">
        {project.title}
      </h1>

      <div className="relative mb-8 h-[420px] w-full overflow-hidden rounded-2xl">
        <Image
          src={coverImageUrl}
          alt={project.title}
          fill
          className="object-cover"
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
            className="relative h-80 overflow-hidden rounded-xl"
          >
            <Image
              src={image.url}
              alt={project.title}
              fill
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>
    </main>
  )
}