import { formatAction } from "./actionFormatter.js";
import { formatVariableUpdate } from "./variableUpdateFormatter.js";

/**
 * Met en forme une section
 * @param {import("@prisma/client").Section} data
 */
export function formatSection(data) {
  return {
    titre: data.titre,
    texte: data.texte,
    actions: data.actions.map(formatAction),
    updates: data.miseAJourVar.map(formatVariableUpdate),
  };
}
