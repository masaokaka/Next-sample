import { MongoClient } from "mongodb";
export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://masaokaka:masaokaka0302@cluster0.lie12.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDoc(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDoc(client, collection, sort, filter) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ _id: -1 })
    .toArray();
  return documents;
}
