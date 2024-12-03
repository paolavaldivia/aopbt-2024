import {test, fc} from "@fast-check/vitest";
import sortLetters from "../src/advent-01";
import type {Letter} from "../src/advent-01";

function shuffle<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

function lettersEqual(a: Letter[], b: Letter[]) {
    return a.length === b.length && a.every((v, i) => v.name === b[i].name && v.age === b[i].age);
}

test("helping Santa", () => {
    fc.assert(
        fc.property(
            fc.array(
                fc.record({
                        age: fc.integer({min: 7, max: 77}),
                        name: fc.string({
                            minLength: 1,
                            unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split(''))
                        })
                    }
                )
            ),
            (letters) => {
                const shuffled = shuffle(letters);
                return lettersEqual(sortLetters(letters), sortLetters(shuffled));
            }
        ),
        {numRuns: 1000}
    );
});
