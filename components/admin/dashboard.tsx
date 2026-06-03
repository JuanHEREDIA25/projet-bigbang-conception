import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import LogoutButton from "@/components/admin/log-out"
import PageIllustration from "../page-illustration"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/admin/signin")
  }

  return (
    <section className="relative">
      <PageIllustration />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="mb-12 flex items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold">
                Bienvenue {session.user.name}
              </h1>
              <p className="mt-3 text-gray-600">
                Gérez les projets, les devis et les images du site.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/admin/projets/nouveau"
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">
                Créer un projet
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Ajoutez un nouveau projet avec titre, description, catégorie et images.
              </p>
            </Link>

            <Link
              href="/admin/devis"
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">
                Voir les devis
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Consultez les demandes envoyées par les visiteurs du site.
              </p>
            </Link>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                Modifier les images
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Accédez aux pages concernées pour modifier leurs images directement.
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <Link
                  href="/admin/homepage"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Images page d'accueil
                </Link>

                <Link
                  href="/admin/projets"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Images page projets
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Actions rapides
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/admin/projets/nouveau"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              >
                Gérer les projets
              </Link>

              <Link
                href="/admin/devis"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
              >
                Voir les devis reçus
              </Link>

              <Link
                href="/admin/accueil"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium"
              >
                Voir le site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}