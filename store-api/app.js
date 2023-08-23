const express = require('express');
const app = express();  
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./database/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});

app.use("/api/v1/products", productsRouter);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Database connection established successfully...");
        app.listen(port, console.log(`Server started on port ${port}...`));
    }
    catch (err) {
        console.log(err);
    }
}

startServer();