import {fc, test} from "@fast-check/vitest";
import respace from "../src/advent-08";

test('helping Santa', () => {
    fc.assert(
        fc.property(
            fc.uniqueArray(
                fc.string({
                    minLength: 1, maxLength: 20,
                    unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split(''))
                }),
                {
                    minLength: 2
                }
            ),
            (words: string[]) => {
                const message = words.join('');
                const  decoded = respace(message, words);
                if (decoded === message)
                    throw new Error(`"${message}" could have been decoded with words: \n${words.join('\n')}`);
                return true;
            }
        ),
        {
            verbose: true,
        }
    );
})
