const express = require('express');
const app = express();
const connectDB = require("./backend/database/connect");
const tasks = require("./backend/routes/tasks");
const notFound = require("./backend/middlewares/notFound");
const errorHandler = require("./backend/middlewares/errorHandler");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks/", tasks);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Database connection successful..");
        app.listen(port, console.log(`Server started on port ${port}`));
    }
    catch (err) {
        console.log(err);
    }
}

startServer();