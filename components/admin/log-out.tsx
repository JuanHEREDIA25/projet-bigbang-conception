"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      Se déconnecter
    </button>
  )
}