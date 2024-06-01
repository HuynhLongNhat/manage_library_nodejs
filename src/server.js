require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { configCors } from "./config/cors";
import LibraryManagementApi from "./routes/LibraryManagementApi";

import cors from "cors"

const app = express();
const PORT = process.env.PORT || 8888;

configCors(app)
// app.use(cors())
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes

LibraryManagementApi(app)

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log("library_management backend is running on the port =  " + PORT);
});
