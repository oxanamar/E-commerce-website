// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../utils/db";

export default async function handler(req, res) {
  try {
    // Await the asynchronous database connection
    await db.connectDb();

    // Your API logic goes here
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    // Handle any errors that occur during database connection or API logic
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Ensure the database is disconnected after the operation
    await db.disconnectDb();
  }
}
