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

        let horizontal = 0;
        let depth = 0;

        for (const a in this.array) {
            if (this.array[a].includes("forward")) {
                horizontal += Number(this.array[a].split(" ")[1]);
            } else if (this.array[a].includes("down")) {
                depth += Number(this.array[a].split(" ")[1]);
            } else if (this.array[a].includes("up")) {
                depth -= Number(this.array[a].split(" ")[1]);
            };
        };

        return horizontal * depth;
    };

    private async answerTwo() {
        let horizontal = 0;
        let depth = 0;
        let aim = 0;

        for (const a in this.array) {
            if (this.array[a].includes("forward")) {
                horizontal += Number(this.array[a].split(" ")[1]);
                const next = aim*Number(this.array[a].split(" ")[1]);

                if (this.prev === null) {
                    depth = next;
                    this.prev = depth;
                } else {
                    depth = this.prev + next;
                    this.prev = depth;
                };

            } else if (this.array[a].includes("down")) {
                aim += Number(this.array[a].split(" ")[1]);
            } else if (this.array[a].includes("up")) {
                aim -= Number(this.array[a].split(" ")[1]);
            };
        };
        console.log("H", horizontal);
        console.log("D", depth);
        console.log("A", aim);
        return horizontal * depth;
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
