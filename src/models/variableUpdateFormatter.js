/**
 * Met en forme une mise à jour de variable
 * @param {import("@prisma/client").MiseAJourVar} data
 */
export function formatVariableUpdate(data) {
  return {
    nom: data.variable.nom,
    valeur: data.quantite,
  };
}
