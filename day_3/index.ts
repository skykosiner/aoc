import { readFile } from "fs";

class Solve {
    array: string[];
    prev: number | null = null;
    constructor() {
        this.array = [];
    };

    private getFile() {
        return new Promise((res, rej) => {
            readFile("./day2.input", (err, data: Buffer) => {
                if (err) {
                    console.log(err);
                    rej(err);
                } else {
                    const arr = data.toString().split("\n")
                    for (const a in arr) {
                        if (arr[a] !== "") this.array.push(arr[a]);
                    };
                    res(null);
                }
            });
        });
    };

    private async answerOne() {
        await this.getFile();
    };

    private async answerTwo() {
    };

    public async main() {
        const anwserOne = await this.answerOne();
        const answerTwo = await this.answerTwo();

        return {
            answerOne: anwserOne,
            answerTwo: answerTwo,
        };
    };
};

async function run(): Promise<void> {
    const solve = new Solve();

    const result = await solve.main();

    console.log(`Answer 1: ${result.answerOne}`);
    console.log(`Answer 2: ${result.answerTwo}`);
};

run();
