import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { join } from "path";

const prisma = new PrismaClient();

// const inputDir = join(process.cwd(), "in");
const inputDir = process.env.IN_FOLDER;

async function main() {
  const sections = await prisma.section.findMany();

  try {
    await Promise.all(
      sections.map((section) => {
        const { idLivre, id, texte } = section;
        const filename = `${idLivre}-${id}.txt`;

        return fs.writeFile(join(inputDir, filename), texte);
      })
    );
  } catch (err) {
    console.error("Error writing files:", err);
  }
}

main();
