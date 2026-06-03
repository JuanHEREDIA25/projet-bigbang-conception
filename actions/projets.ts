"use server"

import { prisma } from "@/lib/prisma/prisma"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

async function uploadImage(file: File, folder: string) {
  const extension = file.name.split(".").pop()
  const filePath = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error } = await supabaseAdmin.storage
    .from("images-bigbang")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    throw new Error(error.message)
  }

  return filePath
}

export async function createProject(formData: FormData) {
  const title = String(formData.get("title"))
  const description = String(formData.get("description"))
  const categoryId = Number(formData.get("categoryId"))
  const coverFile = formData.get("coverImage") as File | null
  const galleryFiles = formData.getAll("images") as File[]

  if (!title || !description || !categoryId || !coverFile) {
    throw new Error("Tous les champs sont obligatoires")
  }

  const slug = slugify(title)
  const coverImagePath = await uploadImage(coverFile, "projects/covers")

  const project = await prisma.project.create({
    data: {
      title,
      slug,
      description,
      categoryId,
      coverImage: coverImagePath,
    },
  })

  for (const file of galleryFiles) {
    if (file.size === 0) continue

    const imagePath = await uploadImage(file, "projects/gallery")

    await prisma.projectImage.create({
      data: {
        url: imagePath,
        projectId: project.id,
      },
    })
  }

  revalidatePath("/projets")
  revalidatePath("/admin/projets")
}