import prisma from "../services/prisma.js";

export function findEnigmeById(idEnigme) {
  return prisma.actionEnigme.findUnique({
    where: {
      id: parseInt(idEnigme),
    },
  });
}
