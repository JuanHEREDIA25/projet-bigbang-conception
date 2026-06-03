"use server"

import { prisma } from "@/lib/prisma/prisma"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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

  redirect("/admin/projets?created=1")
}

export async function updateProject(formData: FormData) {
  const projectId = Number(formData.get("projectId"))
  const title = String(formData.get("title"))
  const description = String(formData.get("description"))
  const categoryId = Number(formData.get("categoryId"))
  const coverFile = formData.get("coverImage") as File | null
  const galleryFiles = formData.getAll("images") as File[]

  if (!projectId || !title || !description || !categoryId) {
    throw new Error("Données invalides")
  }

  const oldProject = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!oldProject) {
    throw new Error("Projet introuvable")
  }

  let coverImagePath = oldProject.coverImage

  if (coverFile && coverFile.size > 0) {
    await supabaseAdmin.storage
      .from("images-bigbang")
      .remove([oldProject.coverImage])

    coverImagePath = await uploadImage(coverFile, "projects/covers")
  }

  const newSlug = slugify(title)

  await prisma.project.update({
    where: { id: projectId },
    data: {
      title,
      slug: newSlug,
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
        projectId,
      },
    })
  }

  revalidatePath("/projets")
  revalidatePath(`/projets/${oldProject.slug}`)
  revalidatePath(`/projets/${newSlug}`)
  revalidatePath("/admin/projets")

  redirect("/admin/projets?updated=1")
}

export async function deleteProject(formData: FormData) {
  const projectId = Number(formData.get("projectId"))

  if (!projectId) {
    throw new Error("Projet invalide")
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      images: true,
    },
  })

  if (!project) {
    throw new Error("Projet introuvable")
  }

  const filesToDelete = [
    project.coverImage,
    ...project.images.map((image) => image.url),
  ]

  if (filesToDelete.length > 0) {
    await supabaseAdmin.storage
      .from("images-bigbang")
      .remove(filesToDelete)
  }

  await prisma.project.delete({
    where: { id: projectId },
  })

  revalidatePath("/projets")
  revalidatePath("/admin/projets")

  redirect("/admin/projets?deleted=1")
}

export async function deleteProjectImage(formData: FormData) {
  const imageId = Number(formData.get("imageId"))
  const projectId = Number(formData.get("projectId"))

  if (!imageId || !projectId) {
    throw new Error("Image invalide")
  }

  const image = await prisma.projectImage.findUnique({
    where: { id: imageId },
    include: {
      project: true,
    },
  })

  if (!image) {
    throw new Error("Image introuvable")
  }

  await supabaseAdmin.storage
    .from("images-bigbang")
    .remove([image.url])

  await prisma.projectImage.delete({
    where: { id: imageId },
  })

  revalidatePath("/projets")
  revalidatePath(`/projets/${image.project.slug}`)
  revalidatePath("/admin/projets")
  revalidatePath(`/admin/projets/${projectId}/edit`)
}