"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { createProject } from "@/actions/projets"
import type { Category } from "@/lib/generated/prisma"
import Link from "next/link"

type Props = {
  categories: Category[]
}

export default function ProjectCreateFormClient({ categories=[], }: Props) {
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [isPending, startTransition] = useTransition()
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  function handleCoverChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    setCoverImage(file)

      if (file) {
    setCoverPreview(URL.createObjectURL(file))
  } else {
    setCoverPreview(null)
  }
}
  function handleGalleryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])

    setGalleryImages((current) => [...current, ...files])

    event.target.value = ""
  }

  function removeGalleryImage(index: number) {
    setGalleryImages((current) => current.filter((_, i) => i !== index))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    if (coverImage) {
      formData.set("coverImage", coverImage)
    }

    formData.delete("images")

    galleryImages.forEach((file) => {
      formData.append("images", file)
    })

    startTransition(async () => {
      await createProject(formData)
    })
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Créer un nouveau projet
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Titre du projet
          </label>
          <input
            name="title"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            placeholder="Ex : Rénovation appartement Paris"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            name="categoryId"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={6}
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            placeholder="Décris les travaux réalisés..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Image de couverture
          </label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleCoverChange}
            className="w-full rounded-md border border-gray-300 p-2"
          />

          {coverPreview && (
            <div className="mt-3 overflow-hidden rounded-xl border bg-gray-50">
              <Image
                src={coverPreview}
                alt="Aperçu couverture"
                width={800}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Images du projet
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="w-full rounded-md border border-gray-300 p-2"
          />

          <p className="mt-1 text-xs text-gray-500">
            Vous pouvez ajouter des images plusieurs fois avant d’envoyer le formulaire.
          </p>

          {galleryImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {galleryImages.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="relative overflow-hidden rounded-xl border bg-white"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-28 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white"
                  >
                    ✕
                  </button>

                  <p className="truncate p-2 text-xs text-gray-600">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
        <Link
            href="/admin/projets"
            className="rounded-md border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
            Annuler
        </Link>

        <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
            {isPending ? "Création en cours..." : "Créer le projet"}
        </button>
        </div>
      </form>
    </section>
  )
}