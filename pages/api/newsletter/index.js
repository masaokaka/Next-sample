import { connectDB, insertDoc } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invaid email address." });
      return;
    }
    let client;
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "connecting to DB failed" });
      return;
    }
    try {
      await insertDoc(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
      return;
    }
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
