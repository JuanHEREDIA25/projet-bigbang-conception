export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="mb-10 text-4xl font-bold text-gray-900">
        Politique de confidentialité
      </h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            1. Responsable du traitement
          </h2>

          <p>
            Les données personnelles collectées sur le site Big Bang
            Conception sont traitées par :
          </p>

          <p className="mt-2">
            <strong>Big Bang Conception</strong>
          </p>

          <p>Adresse : À compléter</p>
          <p>Email : contact@bigbangconception.fr</p>
          <p>Téléphone : À compléter</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            2. Données collectées
          </h2>

          <p>
            Lorsque vous utilisez le formulaire de demande de devis, nous
            pouvons collecter :
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Description de votre projet</li>
            <li>Catégorie de prestation demandée</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            3. Finalité de la collecte
          </h2>

          <p>
            Les données collectées sont utilisées exclusivement pour :
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Répondre aux demandes de devis</li>
            <li>Contacter les clients intéressés</li>
            <li>Assurer le suivi commercial des demandes</li>
            <li>Améliorer la qualité de nos services</li>
          </ul>

          <p className="mt-3">
            Aucune donnée n'est vendue ou transmise à des tiers à des fins
            commerciales.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            4. Base légale du traitement
          </h2>

          <p>
            Le traitement de vos données repose sur votre consentement lorsque
            vous remplissez volontairement un formulaire de demande de devis.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            5. Durée de conservation
          </h2>

          <p>
            Les données sont conservées uniquement pendant la durée nécessaire
            au traitement de votre demande et au suivi de la relation
            commerciale.
          </p>

          <p className="mt-3">
            Les données pourront être supprimées sur simple demande de votre
            part.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            6. Sécurité des données
          </h2>

          <p>
            Big Bang Conception met en œuvre des mesures techniques et
            organisationnelles destinées à protéger les données personnelles
            contre toute perte, accès non autorisé ou divulgation.
          </p>

          <p className="mt-3">
            Les données sont stockées sur des infrastructures sécurisées et
            accessibles uniquement aux personnes autorisées.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            7. Vos droits
          </h2>

          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez des droits suivants :
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Droit d'accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d'opposition</li>
            <li>Droit à la portabilité des données</li>
          </ul>

          <p className="mt-3">
            Pour exercer ces droits, vous pouvez nous contacter à :
          </p>

          <p className="mt-2 font-medium">
            contact@bigbangconception.fr
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            8. Cookies
          </h2>

          <p>
            Le site peut utiliser des cookies techniques nécessaires à son bon
            fonctionnement.
          </p>

          <p className="mt-3">
            Aucun cookie publicitaire ou de profilage n'est utilisé sans votre
            consentement.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            9. Contact
          </h2>

          <p>
            Pour toute question concernant cette politique de confidentialité
            ou le traitement de vos données personnelles, vous pouvez nous
            contacter :
          </p>

          <p className="mt-3">
            <strong>Email :</strong> contact@bigbangconception.fr
          </p>
        </section>

        <section>
          <p className="text-sm text-gray-500">
            Dernière mise à jour : {new Date().getFullYear()}
          </p>
        </section>
      </div>
    </main>
  )
}