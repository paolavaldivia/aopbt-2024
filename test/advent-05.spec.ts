import {test, fc} from "@fast-check/vitest";
import isSecurityKey from "../src/advent-05";


test('helping Santa', () => {
    fc.assert(
        fc.property(
            fc.integer({min: 2, max: 1000}),
            fc.integer({min: 2, max: 1000}),
            fc.integer({min: 2, max: 1000}),
            (a, b, c) => {
                return !isSecurityKey(a*b*c);
            }
        ),
        {numRuns: 1000}
    );
})
