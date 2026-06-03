import PageIllustration from "./page-illustration"
import { createDevis } from "@/actions/createDevis";
import {prisma} from "@/lib/prisma/prisma"

export default async function DevisUtilisateur() {

      const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
  <>
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-aos="zoom-y-out"
            ></div>
            
            <section className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Demande de devis
              </h2>

              <p className="mb-6 text-sm text-gray-600">
                Remplissez le formulaire, nous vous recontacterons rapidement.
              </p>

              <form action={createDevis} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="firstname"
                    placeholder="Prénom"
                    required
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                  />

                  <input
                    name="lastname"
                    placeholder="Nom"
                    required
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  placeholder="Adresse email"
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm"
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Téléphone"
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm"
                />

                <select
                  name="categoryId"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm"
                >
                  <option value="">Type de prestation</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <textarea
                  name="description"
                  placeholder="Décrivez votre projet..."
                  required
                  rows={5}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm"
                />

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Envoyer ma demande
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}
