export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="mb-10 text-4xl font-bold text-gray-900">
        Mentions légales
      </h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Éditeur du site
          </h2>

          <p>
            <strong>Big Bang Conception</strong>
          </p>

          <p>
            Adresse : À compléter
          </p>

          <p>
            Téléphone : À compléter
          </p>

          <p>
            Email : contact@bigbangconception.fr
          </p>

          <p>
            SIRET : À compléter
          </p>

          <p>
            Responsable de publication : À compléter
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Hébergement
          </h2>

          <p>
            Site hébergé par :
          </p>

          <p>
            <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                >
                Vercel
                </a>
          </p>

          <p>
            340 S Lemon Ave #4133
          </p>

          <p>
            Walnut, CA 91789
          </p>

          <p>
            États-Unis
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Propriété intellectuelle
          </h2>

          <p>
            L'ensemble du contenu présent sur ce site (textes, images,
            photographies, logos, éléments graphiques, etc.) est la propriété
            exclusive de Big Bang Conception, sauf mention contraire.
          </p>

          <p>
            Toute reproduction, représentation, modification ou exploitation,
            totale ou partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Données personnelles
          </h2>

          <p>
            Les informations collectées via les formulaires du site sont
            uniquement utilisées pour répondre aux demandes de devis ou de
            contact.
          </p>

          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d'un droit d'accès, de rectification,
            d'opposition et de suppression de vos données.
          </p>

          <p>
            Pour exercer ce droit, contactez :
            contact@bigbangconception.fr
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Cookies
          </h2>

          <p>
            Le site peut utiliser des cookies techniques nécessaires à son bon
            fonctionnement. Aucun cookie publicitaire n'est utilisé sans le
            consentement de l'utilisateur.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Limitation de responsabilité
          </h2>

          <p>
            Big Bang Conception s'efforce de fournir des informations exactes et
            à jour. Toutefois, aucune garantie n'est donnée quant à
            l'exhaustivité ou à l'exactitude des informations diffusées sur le
            site.
          </p>
        </section>
      </div>
    </main>
  )
}