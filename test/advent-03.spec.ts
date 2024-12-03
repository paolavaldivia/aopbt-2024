import {test, fc} from "@fast-check/vitest";
import isWordIncludedInLetter from '../src/advent-03';


test('helping Santa', () => {
    fc.assert(
        fc.property(
            fc.string(),
            fc.string(),
            (letterContent: string, word: string) => {
                return isWordIncludedInLetter(letterContent + word, word);
            }
        ),
        {numRuns: 1000}
    );
})
