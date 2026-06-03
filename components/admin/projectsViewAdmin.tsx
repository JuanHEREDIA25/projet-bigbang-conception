import Link from "next/link"
import Image from "next/image"
import type { Category, Project } from "@/lib/generated/prisma"
import { deleteProject } from "@/actions/projets"

type ProjectWithCategory = Project & {
  category: Category
}

type Props = {
  projects: ProjectWithCategory[]
  created?: boolean
  deleted?: boolean
}

export default function AdminProjectsView({
  projects,
  created = false,
  deleted = false,
}: Props) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des projets
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Créez, modifiez ou supprimez les projets visibles sur le site.
          </p>
        </div>

        <Link
          href="/admin/projets/nouveau"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Nouveau projet
        </Link>
      </div>

      {created && (
        <div className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Votre projet a bien été créé.
        </div>
      )}

      {deleted && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Le projet a bien été supprimé.
        </div>
      )}

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          Aucun projet pour le moment.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <div className="relative h-56 w-full bg-gray-100">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 p-4">
                <p className="text-sm font-medium text-blue-600">
                  {project.category.name}
                </p>

                <h2 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h2>

                <p className="line-clamp-2 text-sm text-gray-600">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Link
                    href={`/projets/${project.slug}`}
                    className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Voir
                  </Link>

                  <Link
                    href={`/admin/projets/${project.id}/edit`}
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800"
                  >
                    Modifier
                  </Link>

                  <form action={deleteProject}>
                    <input type="hidden" name="projectId" value={project.id} />

                    <button
                      type="submit"
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}