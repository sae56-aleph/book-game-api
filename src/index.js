import { PrismaClient } from "@prisma/client";
import express from "express";
import { findSectionById } from "./repository.js";
import { formatSection } from "./formatter.js";

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

app.listen(PORT);
