import { prisma } from "@/lib/prisma/prisma"

const baseUrl = "https://bigbangconception.fr"

export default async function sitemap() {
  const projects = await prisma.project.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/projets`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/devis`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projets/${project.slug}`,
      lastModified: project.updatedAt,
    })),
  ]
}