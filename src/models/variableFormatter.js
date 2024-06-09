/**
 * Met en forme une variable
 * @param {import("@prisma/client").Variable} data
 */
export function formatVariable(data) {
  return {
    nom: data.nom,
    valeurInitiale: data.valeurInitale,
    type: data.type,
    icone: data.icone,
  };
}
