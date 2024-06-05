/**
 * Renvoie un message d'erreur serveur (code 500)
 * @param {import("express").Response} res - La réponse à émettre
 * @param {string} message - Le message décrivant l'erreur
 *
 * @author Enzo MAROS
 */
export function sendServerError(res, message) {
  res.status(500);
  res.json({ message });
}

/**
 * Renvoie un message de resource non trouvée (code 404)
 * @param {import("express").Response} res - La réponse à émettre
 *
 * @author Enzo MAROS
 */
export function sendNotFound(res) {
  res.status(404);
  res.json({ message: "Not found" });
}
