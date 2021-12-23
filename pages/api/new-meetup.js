import { MongoClient } from "mongodb";

async function Handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { url, title, description, address } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://mueed:mueed@cluster0.ead6h.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default Handler;
