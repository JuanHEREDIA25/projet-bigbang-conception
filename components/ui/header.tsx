"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Logo from "./logo"

export default function Header() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/projets", label: "Nos projets" },
    { href: "/devis", label: "Mon devis" },
  ]

  return (
    <header className="fixed top-2 z-50 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <ul className="hidden flex-1 items-center justify-end gap-3 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="btn-sm bg-white text-gray-800 shadow-sm transition-colors hover:text-[#d4af37]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-md p-2 text-gray-800 hover:bg-gray-100 md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="mt-2 rounded-2xl bg-white/95 p-3 shadow-lg md:hidden">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 text-sm text-gray-800 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}