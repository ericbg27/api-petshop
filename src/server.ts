import { app } from "./app";
import nodeConfig from "config";

app.listen(nodeConfig.get<number>('api.porta'));