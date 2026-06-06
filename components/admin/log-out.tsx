"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="cursor-pointer
      rounded-md
      bg-red-500
      px-4 py-2
      text-sm font-medium
      text-white
      transition
      hover:bg-red-600"
    >
      Se déconnecter
    </button>
  )
}