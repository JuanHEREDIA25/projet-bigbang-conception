"use server"

import { prisma } from "@/lib/prisma/prisma"
import { DevisStatus } from "@/lib/generated/prisma"
import { revalidatePath } from "next/cache"

export async function updateDevisStatus(formData: FormData) {
  const devisId = Number(formData.get("devisId"))
  const status = formData.get("status") as DevisStatus

  if (!devisId || !status) {
    throw new Error("Données invalides")
  }

  await prisma.devis.update({
    where: {
      id: devisId,
    },
    data: {
      status,
    },
  })

  revalidatePath("/admin/devis")
}