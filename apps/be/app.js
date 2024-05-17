import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import Routes from "./src/Routes/routes";
import cors from 'cors';

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_DB_URL;


const app = express();

//mongodb connection
connect(MONGO_URL)
    .then((e) => console.log("connected"))
    .catch((e) => console.log(e));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors())

//route initialization
app.use("/api/v1", Routes);

//port initialization
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
