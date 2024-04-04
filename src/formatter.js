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
    } else if (data.actionDe) {
        action.type = "DE";
        action.destinsationEchat = data.actionDe.idDestinationEchec;
    } else {
        throw new Error(`Action ${data.id} has no type`);
    }

    return action;
}

/**
 * Met en forme une
 * @param {import("@prisma/client").Section} data
 */
export function formatSection(data) {
    return {
        titre: data.titre,
        texte: data.texte,
        actions: data.actions.map(formatAction),
    };
}
