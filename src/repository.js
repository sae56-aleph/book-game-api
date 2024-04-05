/**
 * @file Permet de gérer les requêtes vers la base de données
 * @author Enzo MAROS
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export function findBookBySlug(slug) {
  return prisma.livre.findUnique({
    where: { slug },
    include: {
      variables: true,
    },
  });
}

export function findEnigmeById(idEnigme) {
  return prisma.actionEnigme.findUnique({
    where: {
      id: parseInt(idEnigme),
    },
  });
}
