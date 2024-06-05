import { formatVariable } from "./variableFormatter.js";

/**
 * Met en forme un livre
 * @param {import("@prisma/client").Livre} data
 */
export function formatBook(data) {
  return {
    id: data.id,
    intro: data.idIntro,
    description: data.description,
    couverture: data.couverture,
    nom: data.nom,
    slug: data.slug,
    variables: data.variables.map(formatVariable),
  };
}
