"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useTransition } from "react"
import type { Category } from "@/lib/generated/prisma"
import { updateProject, deleteProjectImage } from "@/actions/projets"

type ProjectImage = {
  id: number
  url: string
  imageUrl: string
}

type Project = {
  id: number
  title: string
  description: string
  categoryId: number
  coverImage: string
  coverImageUrl: string
  images: ProjectImage[]
}

type Props = {
  project: Project
  categories: Category[]
}

export default function ProjectEditForm({ project, categories }: Props) {
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<
  { file: File; preview: string }[]
>([])
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

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setGalleryImages((current) => [...current, ...newImages])

    event.target.value = ""
  }

  function removeNewGalleryImage(index: number) {
    setGalleryImages((current) => {
      const imageToRemove = current[index]

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }

      return current.filter((_, i) => i !== index)
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.delete("coverImage")
    formData.delete("images")

    if (coverImage) {
      formData.set("coverImage", coverImage)
    }

    galleryImages.forEach((image) => {
    formData.append("images", image.file)
  })

    startTransition(async () => {
      await updateProject(formData)
    })
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8">
      <section className="rounded-2xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Modifier le projet
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Les modifications seront visibles sur la page projets.
            </p>
          </div>

          <Link
            href="/admin/projets"
            className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Retour
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="projectId" value={project.id} />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Titre
            </label>
            <input
              name="title"
              defaultValue={project.title}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Catégorie
            </label>
            <select
              name="categoryId"
              defaultValue={project.categoryId}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            >
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
              defaultValue={project.description}
              required
              rows={6}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Couverture actuelle
            </p>

            <div className="overflow-hidden rounded-xl border bg-gray-50">
              <Image
                src={coverPreview ?? project.coverImageUrl}
                alt={project.title}
                width={1000}
                height={500}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Remplacer la couverture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ajouter de nouvelles images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />

            {galleryImages.length > 0 && (
              <div className="mt-4 grid gap-4 md:grid-cols-4">
                {galleryImages.map((image, index) => (
                  <div key={`${image.file.name}-${index}`}>
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="h-28 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeNewGalleryImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white"
                    >
                      ✕
                    </button>

                    <p className="truncate p-2 text-xs text-gray-600">
                      {image.file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
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
              {isPending ? "Modification..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Images actuelles du projet
        </h2>

        {project.images.length === 0 ? (
          <p className="text-sm text-gray-500">
            Aucune image supplémentaire.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {project.images.map((image) => (
              <div key={image.id} className="space-y-2">
                <div className="overflow-hidden rounded-xl border bg-gray-50">
                  <Image
                    src={image.imageUrl}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="h-40 w-full object-cover"
                  />
                </div>

                <form action={deleteProjectImage}>
                  <input type="hidden" name="imageId" value={image.id} />
                  <input type="hidden" name="projectId" value={project.id} />

                  <button
                    type="submit"
                    className="w-full rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Supprimer l’image
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}