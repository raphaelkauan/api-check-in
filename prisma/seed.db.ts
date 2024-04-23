import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const numberRandom = Math.floor(Math.random() * 1000);
const convertNumberRandom = numberRandom.toString();

async function seed() {
    await prisma.event.create({
        data: {
            id: convertNumberRandom,
            title: convertNumberRandom + "MEU EVENTO",
            slug: convertNumberRandom + "TESTE",
            details: "MEU EVENTO DE TESTE",
            maximumAttendees: 100,
        },
    });
}

seed().then(() => {
    Logger.log("Database seeded!");
    prisma.$disconnect;
});
