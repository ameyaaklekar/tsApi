require('dotenv').config();
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
}).then(async connection => {

    // create express app
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());

    app.use("/api", routes);
    // setup express app here
    // ...

    // start express server
    app.listen(process.env.APP_PORT || 3000, () => {
        console.log(`Server started on port ${process.env.APP_PORT || '3000'}`)
    });
    
    console.log(`Express server has started on port ${process.env.APP_PORT || '3000'}. Open http://localhost:${process.env.APP_PORT || '3000'}/ to see results`);

}).catch(error => console.log(error));
