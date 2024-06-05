/**
 * @file Démarre le serveur Express
 * @author Enzo MAROS
 */

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
