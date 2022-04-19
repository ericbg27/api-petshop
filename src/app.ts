import express, { Request, Response } from 'express';
import { isRequestError, RequestError } from './errors/RequestError';
import { UnexpectedError } from './errors/UnexpectedError';
import { supplierRouter } from './routes/supplierRoutes';
import { productRouter } from './routes/productRoutes';
import session from 'express-session';
import connectRedis from 'connect-redis';
import nodeConfig from "config";
import * as swaggerUi from "swagger-ui-express";
import { MultiFileSwaggerReader } from './helpers/MultiFileSwaggerReader';
import * as fs from 'fs';

const basePath = "/api";

const { createClient } = require('redis');

const app = express();

app.use(express.json());

const swaggerDir = process.cwd() + "/swagger";
const swaggerFile = swaggerDir + "/swagger.json";

const swaggerReader = new MultiFileSwaggerReader();
swaggerReader.readMultiple(swaggerDir, ["swagger.json"]).then((fileContents) => { 
    swaggerReader.read(swaggerFile).then((swaggerDocument) => {
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, undefined, undefined, undefined));
        
        for(const file in fileContents) {
            fs.writeFileSync(file, fileContents[file]);
        }
    });
});

let RedisStore = connectRedis(session);
let redisClient = createClient({
    legacyMode: true,
    host: nodeConfig.get<string>('redis.host'),
    port: nodeConfig.get<number>('redis.port')
});
redisClient.connect().catch(console.error);

app.use(session({
    secret: nodeConfig.get<string>('api.session-secret'),
    store: new RedisStore({
        client: redisClient
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 24*60*60*1000 // 24 hours in millisseconds
    }
}));

app.use(`${basePath}/suppliers`, supplierRouter);
app.use(`${basePath}/suppliers/:supplierId/products`, productRouter);

app.use(function(error: any, req: Request, res: Response, next: any) {
    let err = error;
    if(!isRequestError(error)) {
        err = new UnexpectedError(error.message);
    }

    res.status(err.status);
    res.send(JSON.stringify(
        {
            message: err.message,
            id: err.id,
            name: err.name
        }
    ));

    next();
});

export { app };