export default async function handler(req, res) {
  res
    .status(200)
    .send(
      req.body
        .replace(/\<shar\:id\>.*?\<\/shar\:id\>/gi, "")
        .replace(/\<shar\:password\>.*?\<\/shar\:password\>/gi, ""),
    );
}
