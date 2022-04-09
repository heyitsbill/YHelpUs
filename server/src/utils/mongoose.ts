import mongoose from "mongoose";

const mongoUri =
  process.env.MONGO_URI ||
  "mongodb+srv://yhelpus101:HelpMee202@cluster0.lcpy4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const connectMongoose = async () => mongoose.connect(mongoUri);
export const disconnectMongoose = async () => mongoose.disconnect();
