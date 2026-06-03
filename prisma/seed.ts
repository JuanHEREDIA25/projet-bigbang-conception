import { PrismaClient, Role } from "@/lib/generated/prisma";
import argon2 from "argon2"

const prisma = new PrismaClient()

async function main() {

    const hashedPassword = await argon2.hash("Juanito123")
    const admin = await prisma.user.upsert({
        where: { email:"juan_heredia@hotmail.fr"},
        update: {},
        create: {
            firstname: "Juan",
            lastname: "Heredia",
            email: "juan_heredia@hotmail.fr",
            password:hashedPassword,
            role: Role.ADMIN,
        }
    })

    const categories = await prisma.category.createMany({
        data: [
            {name: "Peinture"},
            {name: "Electricité"},
            {name: "Rénovation"},
            {name: "Plomberie"}
        ],
         skipDuplicates: true,
    })

    const images = await prisma.image.createMany({
        data: [
        {
            path: "homepage/homepage-images.webp",
            section: "homepage",
            sortOrder: 1,
        },
        {
            path: "homepage/plomberie-illustration.jpg",
            section: "homepage",
            sortOrder: 2,
        },
  ],
  skipDuplicates: true,
})

    // Récupérer une catégorie 

    const category = await prisma.category.findFirst({
        where:{
            name:"Peinture"
        }
    })

    if(category) {
        await prisma.project.upsert({
        where: { slug: "renovation-toilette" },
        update: {},
        create: {
            title: "Rénovation toilette",
            slug: "renovation-toilette",
            coverImage: "projects/project-1/couverture-projet1.jpg",
            description: "projet rénovation complète",
            userId: admin.id,
            categoryId: category.id,
        },
        })
        
    }
}

main()
    .catch((e)=>{
        console.error(e)
        process.exit(1)
    })
    .finally(async ()=>{
        await prisma.$disconnect()
    })

