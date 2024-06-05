import express from "express";
import {
  findBookBySlug,
  findSectionById,
  findEnigmeById,
} from "./repository.js";
import { formatBook, formatSection, formatEnigme } from "./formatter.js";
import { levenshteinDistance } from "./levenshtein.js";
import { readFile } from "fs/promises";

const PORT = process.env.PORT || 3000;
const app = express();

function sendError(res, message) {
  res.status(500);
  res.json({ message });
  return res;
}

function sendNotFound(res) {
  res.status(404);
  res.json({ message: "Not found" });
  return res;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/section/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sectionRaw = await findSectionById(id);

  // Traitement des données
  if (!sectionRaw) return sendNotFound(res);

  try {
    const section = formatSection(sectionRaw);
    return res.json(section);
  } catch (error) {
    return sendError(error);
  }
});

app.get("/section/:id/audio", async (req, res) => {
  const id = parseInt(req.params.id);
  const sectionRaw = await findSectionById(id);

  if (!sectionRaw) return sendNotFound(res);

  readFile(`${process.env.OUT_FOLDER}/${sectionRaw.idLivre}-${sectionRaw.id}.wav`).then((data) => {
    res.setHeader("Content-Type", "audio/wav");
    res.send(data);
  }).catch((error) => {
    console.error(error);
    return sendError(res, "Error reading audio file");
  });
});

app.get("/book/:slug", async (req, res) => {
  const slug = req.params.slug;
  const bookRaw = await findBookBySlug(slug);

  if (!bookRaw) return sendNotFound(res);

  const book = formatBook(bookRaw);
  return res.json(book);
});

app.post("/levenshtein/:idEnigme", async (req, res) => {
  const idEnigme = req.params.idEnigme;

  const enigmeRaw = await findEnigmeById(idEnigme);

  const enigme = formatEnigme(enigmeRaw);

  const userGuess = req.body.guessEnigme;

  const levenshteinScore = levenshteinDistance(
    userGuess.toLocaleLowerCase(),
    enigme.reponse.toLocaleLowerCase()
  );

  const enigmeResp = {
    valide: levenshteinScore < 4,
    score: levenshteinScore,
  };

  res.send(enigmeResp);
});

app.listen(PORT);
