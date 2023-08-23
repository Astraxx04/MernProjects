require("dotenv").config();

const connectDB = require("./database/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Database connection established successfully...");
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("Data transfer Successful");
        process.exit(0);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

startServer();