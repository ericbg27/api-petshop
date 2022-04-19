import { resolveRefs } from 'json-refs';
import * as fs from "fs";
import {JsonObject } from "swagger-ui-express";

class MultiFileSwaggerReader {
    async readMultiple(rootDir: string, filesToAvoid: string[]): Promise<{ [key: string]: string } > {
        let originalFileContents: { [key: string]: string } = {};

        const rootDirFiles = fs.readdirSync(rootDir);

        for(const file of rootDirFiles) {
            if(!(filesToAvoid.includes(file))) {
                const completeFileName = rootDir + "/" + file;
        
                const resolvedFile = await this.read(completeFileName);
                if(resolvedFile) {
                    originalFileContents[completeFileName] = fs.readFileSync(completeFileName).toString();
                    fs.writeFileSync(completeFileName, JSON.stringify(resolvedFile, null, 2));
                }
            }
        }

        return originalFileContents;
    }

    async read(rootFile: string): Promise<JsonObject | undefined> {
        const options = {
            filter: ["relative", "remote"],
            loaderOptions: {
                processContent: function (res: any, callback: any) {
                    callback(null, JSON.parse(res.text));
                },
            },
            location: rootFile
        };
        
        const rootFileContent = fs.readFileSync(rootFile, 'utf-8');
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