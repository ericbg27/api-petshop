import { resolveRefs } from 'json-refs';
import * as fs from "fs";
import {JsonObject } from "swagger-ui-express";

class MultiFileSwaggerReader {
    constructor(
        private rootFile: string
    ) {}

    async read(): Promise<JsonObject | undefined> {
        const options = {
            filter: ["relative", "remote"],
            loaderOptions: {
                processContent: function (res: any, callback: any) {
                    callback(null, JSON.parse(res.text));
                },
            },
            location: this.rootFile
        };
        
        const rootFileContent = fs.readFileSync(this.rootFile, 'utf-8');
        if(!rootFileContent) {
            return undefined;
        }
        
        let jsonSwaggerData: Object = JSON.parse(rootFileContent);
        
        let result: void | Object = await resolveRefs(jsonSwaggerData, options).then((results) => {
            return results.resolved; 
        }).catch((err) => {
            console.log(err.stack);
        });

        if(!result) {
            return undefined;
        }

        return result;
    }
}

export { MultiFileSwaggerReader }