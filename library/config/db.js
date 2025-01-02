import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// export const ConnectDB = async ()=> {
//     await mongoose.connect(MONGO_URI)
//     console.log('DB Connected')
// }

export const ConnectDB = async () => {
    try {
      if (mongoose.connection.readyState === 0) {
        const uri = process.env.MONGO_URI; // Ensure this matches your variable name
        if (!uri) throw new Error("MongoDB URI not found in environment variables.");
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
      }
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Database connection failed");
    }
  };