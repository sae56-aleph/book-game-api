import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import { join } from "path";

const prisma = new PrismaClient();

const inputDir = process.env.IN_FOLDER;

async function main() {
  const sections = await prisma.section.findMany({
    include: { actions: true },
  });

  try {
    await Promise.all(
      sections.map((section) => {
        const { idLivre, id, texte, titre, actions } = section;
        const filename = `${idLivre}-${id}.txt`;

        const texteFinal = actions.reduce(
          (acc, action) => acc + `${action.label}.\n`,
          titre + "." + texte
        );

        return fs.writeFile(join(inputDir, filename), texteFinal);
      })
    );
  } catch (err) {
    console.error("Error writing files:", err);
  }
}

main();
