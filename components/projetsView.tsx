import Link from "next/link"
import Image from "next/image"
import type { Category, Project } from "@/lib/generated/prisma"

type ProjectWithCategory = Project & {
  category: Category
}

type Props = {
  projects: ProjectWithCategory[]
  categories: Category[]
}

export default function ProjetsView({ projects, categories }: Props) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">
        Nos projets
      </h1>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/projets"
          className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Tous
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/projets?category=${encodeURIComponent(category.name)}`}
            className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projets/${project.slug}`}
            className="group overflow-hidden rounded-xl border bg-white shadow-sm"
          >
            <div className="relative h-56 w-full">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <p className="mb-1 text-sm text-blue-600">
                {project.category.name}
              </p>

              <h2 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}