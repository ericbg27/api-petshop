import * as sinon from "sinon";

export function mockModule<T extends { [K: string]: any }>(moduleToMock: T, functionsToMock: string[], defaultMockValuesForMock: Partial<{ [K in keyof T]: T[K] }>) {
    return (sandbox: sinon.SinonSandbox, returnOverrides?: Partial<{ [K in keyof T]: T[K] }>): void => {
        const moduleKeys = Object.getOwnPropertyNames(moduleToMock);
        
        let functions: string[] = [];
        for(let func of functionsToMock) {
            if(moduleKeys.includes(func)) {
                functions.push(func);
            }
        }

        let returns: { [key: string]: any } = {};
        if(returnOverrides) {
            returns = returnOverrides;
        } else {
            for(let func of functions) {
                returns[func] = undefined
            }
        }

        functions.forEach((f) => {
            if(returns[f]) {
                sandbox.stub(moduleToMock, f).callsFake(returns[f]);
            } else {
                if(defaultMockValuesForMock[f]) {
                    sandbox.stub(moduleToMock, f).callsFake(defaultMockValuesForMock[f]!);
                } else {
                    throw new Error(`Unable to mock function ${f}`);
                }
            }
        });
    };
}