import Link from "next/link"

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Contactez Big Bang Conception
        </h1>

        <p className="mx-auto max-w-2xl text-gray-600">
          Pour toute demande de projet, nous vous invitons à remplir une demande
          de devis afin de nous transmettre les informations nécessaires.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Nos coordonnées
          </h2>

          <div className="space-y-5 text-gray-600">
            <p><strong className="text-gray-900">Téléphone :</strong> 06 XX XX XX XX</p>
            <p><strong className="text-gray-900">Email :</strong> contact@bigbangconception.fr</p>
            <p><strong className="text-gray-900">Zone :</strong> Île-de-France et région parisienne</p>
            <p><strong className="text-gray-900">Horaires :</strong> Lundi au vendredi, 8h00 - 18h00</p>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-50 p-8 shadow">
          <h2 className="mb-4 text-2xl font-semibold">
            Vous avez un projet ?
          </h2>

          <p className="mb-6 text-gray-500">
            Décrivez votre besoin en quelques minutes et nous vous
            recontacterons rapidement.
          </p>

          <Link
            href="/devis"
            className="inline-flex rounded-md bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Faire une demande de devis
          </Link>
        </div>
      </div>
    </main>
  )
}