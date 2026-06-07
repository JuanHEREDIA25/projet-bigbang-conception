"use server"

import { prisma } from "@/lib/prisma/prisma"
import { revalidatePath } from "next/cache"
import {
  uploadOptimizedImage,
  supabaseAdmin,
} from "@/lib/images/upload-images"

export async function updateHomepageImage(formData: FormData) {
  const file = formData.get("image") as File | null
  const imageId = Number(formData.get("imageId"))

  if (!file || !imageId) {
    throw new Error("Image invalide")
  }

  const oldImage = await prisma.image.findUnique({
    where: {
      id: imageId,
    },
  })

  if (!oldImage) {
    throw new Error("Image introuvable")
  }

  const filePath = await uploadOptimizedImage(file, "homepage", 1600)

  await prisma.image.update({
    where: {
      id: imageId,
    },
    data: {
      path: filePath,
    },
  })

  if (oldImage.path) {
    await supabaseAdmin.storage
      .from("images-bigbang")
      .remove([oldImage.path])
  }

  revalidatePath("/")
  revalidatePath("/admin/accueil")
}