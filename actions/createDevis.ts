"use server"

import { prisma } from "@/lib/prisma/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createDevis(formData: FormData) {
  const firstname = String(formData.get("firstname"))
  const lastname = String(formData.get("lastname"))
  const email = String(formData.get("email"))
  const phone = String(formData.get("phone"))
  const description = String(formData.get("description"))
  const categoryId = Number(formData.get("categoryId"))

  if (!firstname || !lastname || !email || !phone || !description) {
    throw new Error("Tous les champs sont obligatoires")
  }

  await prisma.devis.create({
    data: {
      firstname,
      lastname,
      email,
      phone,
      description,
      categoryId: categoryId || null,
    },
  })

  revalidatePath("/admin/devis")
  redirect("/devis?success=1")
}