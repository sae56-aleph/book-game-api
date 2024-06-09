/**
 * @file Démarre le serveur Express
 * @author Enzo MAROS
 */

import app from "./app.js";
import { cacheConnect } from "./services/redis.js";

const PORT = process.env.PORT || 3000;

cacheConnect();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
