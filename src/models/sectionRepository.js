import prisma from "../services/prisma.js";

export function findSectionById(id) {
  return prisma.section.findUnique({
    where: { id },
    include: {
      miseAJourVar: {
        include: { variable: true },
      },
      actions: {
        include: {
          actionCombat: true,
          actionCondition: true,
          actionDe: true,
          actionSimple: true,
          actionEnigme: true,
        },
      },
    },
  });
}
