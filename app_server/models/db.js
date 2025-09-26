const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI missing. Add it to your .env");
  process.exit(1);
}

mongoose.set("strictQuery", true);

mongoose
  .connect(uri)
  .then(() => console.log("Mongo connected:", mongoose.connection.name))
  .catch((err) => {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongo connection closed");
  process.exit(0);
});
