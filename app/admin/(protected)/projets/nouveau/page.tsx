import ProjectCreateFormClient from "@/components/admin/projectForm"
import { prisma } from "@/lib/prisma/prisma"



export default async function NewProjectPage() {
    const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <main className="p-6">
      <ProjectCreateFormClient categories={categories}/>
    </main>
  )
}