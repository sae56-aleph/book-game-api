import { readFile } from "fs/promises";
import { formatSection } from "../models/sectionFormatter.js";
import { findSectionById } from "../models/sectionRepository.js";
import { sendNotFound, sendServerError } from "../services/response.js";
import { getImageFromCache } from "../services/redis.js";
import { fetchImage } from "../services/image.js";

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

export async function getSectionAudio(req, res) {
  const id = parseInt(req.params.id);
  const sectionRaw = await findSectionById(id);

  if (!sectionRaw) return sendNotFound(res);

  try {
    const audio = await readFile(
      `${process.env.OUT_FOLDER}/${sectionRaw.idLivre}-${sectionRaw.id}.wav`
    );
    res.setHeader("Content-Type", "audio/wav");
    res.send(audio);
  } catch (error) {
    console.error(error);
    sendServerError(res, "Error reading audio file");
  }
}

export async function getSectionImage(req, res) {
  const id = parseInt(req.params.id);
  const section = await findSectionById(id);
  const imageKey = `${section.idLivre}-${section.id}`;

  try {
    const image = await getImageFromCache(imageKey, async () => {
      const imageUrl = await fetchImage(section.texte);
      if (!imageUrl) throw new Error("Unable to generate new image");

      const imageData = await fetch(imageUrl);
      const imageBuffer = await imageData.arrayBuffer();
      return Buffer.from(imageBuffer);
    });

    res.setHeader("Content-Type", "image/jpeg");
    res.send(image);
  } catch (error) {
    sendServerError(res, error.message);
  }
}
