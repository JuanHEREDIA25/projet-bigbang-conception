"use server"

import { prisma } from "@/lib/prisma/prisma"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function updateHomepageImage(formData: FormData) {
  const file = formData.get("image") as File | null
  const imageId = Number(formData.get("imageId"))

  if (!file || !imageId) {
    throw new Error("Image invalide")
  }

  const extension = file.name.split(".").pop()
  const filePath = `homepage/${imageId}-${Date.now()}.${extension}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error } = await supabaseAdmin.storage
    .from("images-bigbang")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (error) {
    throw new Error(error.message)
  }

  await prisma.image.update({
    where: {
      id: imageId,
    },
    data: {
      path: filePath,
    },
  })

  revalidatePath("/")
  revalidatePath("/admin/accueil")
}