import { formatBook } from "../models/bookFormatter.js";
import { findBookBySlug } from "../models/bookRepository.js";
import { sendNotFound } from "../services/response.js";

/**
 * Récupère un unique livre dont le nom (slugifié) est donnée en paramètres
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function getBook(req, res) {
  const slug = req.params.slug;
  const bookRaw = await findBookBySlug(slug);

  if (!bookRaw) return sendNotFound(res);

  const book = formatBook(bookRaw);
  return res.json(book);
}
