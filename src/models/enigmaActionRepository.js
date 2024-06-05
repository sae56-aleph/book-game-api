import prisma from "../services/prisma";

export function findEnigmeById(idEnigme) {
  return prisma.actionEnigme.findUnique({
    where: {
      id: parseInt(idEnigme),
    },
  });
}
