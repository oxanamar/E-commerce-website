import mongoose from "mongoose";
const connection = {};

export async function connectDb() {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database");
      return;
    }

    // Disconnect the existing connection if not in a connected state
    await mongoose.disconnect();
  }

  try {
    // Connect to MongoDB
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log("New connection to the database");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Failed to connect to the database", error);
    throw new Error("Database connection failed");
  }
}

export async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      try {
        await mongoose.disconnect();
        connection.isConnected = false;
        console.log("Disconnected from the database");
      } catch (error) {
        console.error("Failed to disconnect from the database", error);
        throw new Error("Database disconnection failed");
      }
    } else {
      console.log("Not disconnecting from the database (dvelopment mode)");
    }
  }
}

export default { connectDb, disconnectDb };
