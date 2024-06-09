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
