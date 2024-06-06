import { formatEnigme } from "../models/actionFormatter.js";
import { findEnigmeById } from "../models/enigmaActionRepository.js";
import { levenshteinDistance } from "../services/levenshtein.js";

export async function checkEnigma(req, res) {
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
}
