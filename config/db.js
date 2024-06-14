import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.DB_URL);
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("DB connected!!"));
    const dbConnection = mongoose.connection;
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    dbConnection.once("open", () => console.log("Connected to DB!"));
  } catch (error) {
    console.log(error);
  }
};
