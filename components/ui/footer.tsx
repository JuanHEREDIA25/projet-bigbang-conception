import Link from "next/link"
import Logo from "./logo"

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${
            border
              ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]"
              : ""
          }`}
        >
          <div className="space-y-3 sm:col-span-12 lg:col-span-5">
            <Logo />
            <p className="text-sm text-gray-600">
              Big Bang Conception accompagne particuliers et professionnels dans
              leurs projets de rénovation, électricité, plomberie et peinture.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Big Bang Conception. Tous droits réservés.
            </p>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-4 lg:col-span-2">
            <h3 className="text-sm font-medium">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/">Accueil</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/projets">Nos projets</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/devis">Demande de devis</Link></li>
            </ul>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-4 lg:col-span-2">
            <h3 className="text-sm font-medium">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/projets?category=Rénovation">Rénovation</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/projets?category=Electricité">Électricité</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/projets?category=Plomberie">Plomberie</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/projets?category=Peinture">Peinture</Link></li>
            </ul>
          </div>

          <div className="space-y-2 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <h3 className="text-sm font-medium">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/contact">Contact</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="/mentions-legales">Mentions légales</Link></li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-xs text-gray-300 transition hover:text-gray-500"
                >
                  Espace administration
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}