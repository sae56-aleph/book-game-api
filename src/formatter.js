/**
 * @file Permet de mettre en forme les données pour les envoyer via l'API
 * @author Enzo MAROS
 */

/**
 * Met en forme une action brute venant de la base
 * @param {import("@prisma/client").Action} data
 */
export function formatAction(data) {
  const action = {
    id: data.id,
    destination: data.idDestination,
    label: data.label,
  };

  if (data.actionCombat) {
    action.type = "COMBAT";
    action.destinationEchec = data.actionCombat.idDestinationEchec;
  } else if (data.actionSimple) {
    action.type = "SIMPLE";
  } else if (data.actionCondition) {
    action.type = "CONDITION";
    action.condition = data.actionCondition.condition;
  } else if (data.actionEnigme) {
    action.type = "ENIGME";
    action.reponse = data.actionEnigme.reponse;
    action.idEnigme = data.actionEnigme.id;
  } else if (data.actionDe) {
    action.type = "DE";
    action.destinationEchec = data.actionDe.idDestinationEchec;
    action.seuil = data.actionDe.seuil;
  } else {
    throw new Error(`Action ${data.id} has no type`);
  }

  return action;
}

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

/**
 * Met en forme une enigme
 * @param {import("@prisma/client").ActionEnigme} data
 */
export function formatEnigme(data) {
  return {
    id: data.id,
    reponse: data.reponse,
    idAction: data.idAction,
  };
}
