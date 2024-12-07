import {fc, test} from "@fast-check/vitest";
import simplifyLocation from "../src/advent-07";


function extracted(ss: number, se: number, num: number, isDot: boolean) {
    const numOrDots = isDot ? ".".repeat((num % 2)+1) : `${num}`;
    return "/".repeat(ss) + numOrDots + "/".repeat(se);
}

function makeInput(
    arr: [number, number, number, boolean][],
) {
    const second = arr.slice(1)
        .map(([ss, se, num, isDot]) => extracted(ss, se, num, isDot))
        .join("");
    const [_ss, se, num, _isDot] = arr[0];
    return extracted(1, se, num, false) + second;
}

test('helping Santa', () => {
    fc.assert(
        fc.property(
            fc.array(
                fc.tuple(
                    fc.integer({min: 0, max: 3}),
                    fc.integer({min: 1, max: 3}),
                    fc.integer({min: 0, max: 4}),
                    fc.boolean(),
                ),
                {
                    minLength: 3, maxLength: 10
                }
            ),
            (arr: [number, number, number, boolean][]) => {
                const toCheck = makeInput(arr);
                const simplified = simplifyLocation(toCheck);
                // Corrupted paths must not be modified.
                // Didn't find a way to corrupt the input that's accepted in the sandbox
                // Paths must not end with a slash.
                if (simplified.endsWith('/')) throw new Error(`(${toCheck}): ${simplified} should not end in /`);
                // No two or more consecutive slashes are allowed.
                if (simplified.includes('//')) throw new Error(`(${toCheck}): ${simplified} should not include //`);
                // . and .. boxes must be resolved or removed entirely.
                if (simplified.includes('.')) throw new Error(`(${toCheck}): ${simplified} should not include .`);
                return true;
            }
        ),
        {
            verbose: true,
        }
    );
})
