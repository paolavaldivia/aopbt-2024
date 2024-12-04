import {test, fc} from "@fast-check/vitest";
import fastPostOfficeFinderEmulator, {Position} from "../src/advent-04";


test('helping Santa', () => {
    fc.assert(
        fc.property(
            fc.record({
                x: fc.integer({min: 0, max: 9999}),
                y: fc.integer({min: 0, max: 999}),
            }),
            fc.record({
                x: fc.integer({min: 0, max: 9999}),
                y: fc.integer({min: 0, max: 999}),
            }),
            (initial: Position, target: Position) => {
                return fastPostOfficeFinderEmulator(initial, target) <= 14;
            }
        ),
        {numRuns: 1000}
    );
})
