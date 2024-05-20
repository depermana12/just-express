require("dotenv").config();

const { MongoClient } = require("mongodb");

const mongoUrl = process.env.MONGO_URI;
const client = new MongoClient(mongoUrl);

const dbName = "mgt";
// set as singleton instance
let dbInstance;

const connectDB = async () => {
  try {
    if (!dbInstance) {
      // if it already set, return the existing instance and reuse it, else connect db
      await client.connect();
      console.log("MongoDB connected");
      dbInstance = client.db(dbName);
      // const collection = dbInstance.collection("products");
      // const products = await collection.find({}).toArray();
      // console.log(products);
    }
    return dbInstance;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
