"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)

    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Email ou mot de passe incorrect")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Connexion admin</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="juan_heredia@hotmail.fr"
              required
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              className="form-input w-full py-2"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="submit"
            className="btn w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]"
          >
            Se connecter
          </button>
          <Link
            href="/"
            className="btn w-full border border-gray-300 bg-white text-center text-gray-700 hover:bg-gray-50"
          >
            ← Revenir au site
          </Link>

          
        </div>
      </form>
    </>
  )
}