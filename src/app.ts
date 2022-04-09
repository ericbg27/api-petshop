import express, { Request, Response } from 'express';
import { isRequestError, RequestError } from './errors/RequestError';
import { UnexpectedError } from './errors/UnexpectedError';
import { supplierRouter } from './routes/supplierRoutes';
import { productRouter } from './routes/productRoutes';
import session from 'express-session';
import connectRedis from 'connect-redis';
import nodeConfig from "config";

const { createClient } = require('redis');

const app = express();

app.use(express.json());

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

app.use('/suppliers', supplierRouter);
app.use('/suppliers/:supplierId/products', productRouter);

console.log(app.path());

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