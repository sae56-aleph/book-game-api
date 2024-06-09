import { commandOptions, createClient } from "redis";

const client = createClient({ url: "redis://localhost:6379" });
const returnBuffer = commandOptions({ returnBuffers: true });
const imageExpire = 7 * 24 * 60 * 60; // 7 jours
// const imageExpire = 60;

export async function cacheConnect() {
  client.on("error", console.log);
  await client.connect();

  console.log("Connected to Redis");
}

export async function cacheDisconnect() {
  await client.disconnect();
}

export async function getImageFromCache(key, callback) {
  let image = await client.get(returnBuffer, key);
  if (!image) {
    // Génération d'une nouvelle image via le callback
    image = await callback();
    await client.setEx(key, imageExpire, image);
  }

  return image;
}
