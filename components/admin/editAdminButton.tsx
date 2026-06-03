"use client"

import { useEffect, useState, useTransition } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X, ImagePlus } from "lucide-react"
import { updateHomepageImage } from "@/actions/images"

type Props = {
  imageId: number
  currentImageUrl: string
}

export function HomepageImageModal({
  imageId,
  currentImageUrl,
}: Props) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) {
    return null
  }

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setPreview(null)
      setFileName("")
      return
    }

    setPreview(URL.createObjectURL(file))
    setFileName(file.name)
  }

  function closeModal() {
    setOpen(false)
    setPreview(null)
    setFileName("")
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateHomepageImage(formData)
      closeModal()
    })
  }

  const modal = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 p-4">
      <div className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
        <button
          type="button"
          onClick={closeModal}
          disabled={isPending}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="pr-8 text-lg font-semibold text-gray-900">
          Modifier l’image d’accueil
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Sélectionnez une nouvelle image depuis votre ordinateur.
        </p>

        <form action={handleSubmit} className="mt-5 space-y-4">
          <input type="hidden" name="imageId" value={imageId} />

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Image actuelle
            </p>

            <Image
              src={currentImageUrl}
              alt="Image actuelle"
              width={500}
              height={250}
              className="h-28 w-full rounded-xl object-cover"
            />
          </div>

          {preview && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Nouvelle image
              </p>

              <img
                src={preview}
                alt="Aperçu de la nouvelle image"
                className="h-32 w-full rounded-xl object-cover"
              />
            </div>
          )}

          <div>
            <label
              htmlFor={`image-upload-${imageId}`}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-5 text-center transition hover:bg-blue-100"
            >
              <ImagePlus className="mb-2 h-7 w-7 text-blue-600" />

              <span className="text-sm font-medium text-blue-700">
                Choisir une image
              </span>

              <span className="mt-1 text-xs text-gray-500">
                JPG, PNG ou WEBP
              </span>
            </label>

            <input
              id={`image-upload-${imageId}`}
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="hidden"
            />

            {fileName && (
              <p className="mt-2 truncate text-sm text-green-600">
                Image sélectionnée : {fileName}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={closeModal}
              disabled={isPending}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-blue-700"
      >
        Modifier
      </button>

      {mounted && open && createPortal(modal, document.body)}
    </>
  )
}