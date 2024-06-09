export default function corsMiddleware(_, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
}
