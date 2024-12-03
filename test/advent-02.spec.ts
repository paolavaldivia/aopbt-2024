import {test, fc} from "@fast-check/vitest";
import dropLettersFromDuplicatedSenders from '../src/advent-02';
import type {Letter} from "../src/advent-02";

test('helping Santa', () => {
    fc.assert(
        fc.property(
            fc.uniqueArray(
                fc.record({id: fc.string()}),
                {
                    selector: v => v.id
                }
            ),
            (letters: Letter[]) => {
                return dropLettersFromDuplicatedSenders([...letters, ...letters]).length === letters.length;
            }
        ),
        {numRuns: 1000}
    );
})