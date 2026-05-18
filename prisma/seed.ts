import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient()

async function main() {
    await prisma.category.create({
        data: {
            name: "Peinture"


        }
    })
}