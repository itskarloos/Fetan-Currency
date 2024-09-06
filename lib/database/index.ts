import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

const connectToDatabase = async () => {
  try {
    if (cached.conn) {
      console.log("Using cached database connection");
      return cached.conn;
    }

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    console.log("Attempting to connect to database...");
    cached.promise = await mongoose.connect(MONGODB_URI, {
      dbName: "exchange_rate_db",
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    cached.conn = await cached.promise;
    console.log("Successfully connected to database");
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to database:", error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    if (error instanceof mongoose.Error.MongooseServerSelectionError) {
      console.error(
        "MongoDB server selection error. Please check your connection string and network."
      );
    }
    throw error;
  }
};

const checkDatabaseConnection = async () => {
  try {
    await connectToDatabase();
    return mongoose.connection.readyState === 1; // 1 means connected
  } catch (error) {
    console.error("Error checking database connection:", error);
    return false;
  }
};

export { connectToDatabase, checkDatabaseConnection };
