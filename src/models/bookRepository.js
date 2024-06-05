import prisma from "../services/prisma.js";

export function findBookBySlug(slug) {
  return prisma.livre.findUnique({
    where: { slug },
    include: {
      variables: true,
    },
  });
}
