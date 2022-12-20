import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database online.');
  } catch (error) {
    console.log(error);
    throw new Error(error.mongoose);
  }
};
