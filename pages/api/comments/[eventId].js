import { connectDB, insertDoc, getAllDoc } from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: "connecting to DB failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDoc(client, "comments", newComment);
      client.close();
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  } else if (req.method === "GET") {
    try {
      const documents = await getAllDoc(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }
  client.close();
}

export default handler;
