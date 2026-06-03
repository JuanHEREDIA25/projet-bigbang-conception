"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import Link from "next/link"
import LogoutButton from "@/components/admin/log-out"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    })
  }, [])

  return (
    <>
      <header className="fixed top-0 z-40 w-full bg-white shadow">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <nav className="flex items-center gap-4">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/projets">Projets</Link>
            <Link href="/admin/devis">Devis</Link>
            <Link href="/">Voir le site</Link>
          </nav>

          <LogoutButton />
        </div>
      </header>

      <main className="grow pt-20">
        {children}
      </main>
    </>
  )
}