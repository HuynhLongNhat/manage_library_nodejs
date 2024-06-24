require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import { configCors } from "./config/cors";
import LibraryManagementApi from "./routes/LibraryManagementApi";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 8888;

// configCors(app)
app.use(cors())
//config body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//init web routes
app.use(cookieParser())
LibraryManagementApi(app)

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log("library_management backend is running on the port =  " + PORT);
});
