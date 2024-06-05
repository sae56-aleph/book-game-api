import { formatSection } from "../models/sectionFormatter.js";
import { findSectionById } from "../models/sectionRepository.js";
import { sendNotFound, sendServerError } from "../services/response.js";

export async function getSection(req, res) {
  const id = parseInt(req.params.id);
  const sectionRaw = await findSectionById(id);

  // Traitement des données
  if (!sectionRaw) return sendNotFound(res);

  try {
    const formattedSection = formatSection(sectionRaw);
    res.json(formattedSection);
  } catch (error) {
    sendServerError(error);
  }
}
