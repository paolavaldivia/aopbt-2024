import {test, fc} from "@fast-check/vitest";
import type {Unit} from "../src/advent-06";
import nextBarcode from "../src/advent-06";


const units: Unit[] = [
    '✉️', '🧺', '🎄', '🔔', '🕯️', '⭐', '🦌', '⛄', '🛷', '❄️', '🎿', '✨', '🤩', '🥳', '🎈', '🪀', '🎮', '🎲', '♟️', '💝', '🎀', '🧦', '🎅', '🤶', '🎁'
];


test('helping Santa', () => {
    fc.assert(
        fc.property(
            fc.array(
                fc.integer({min: 0, max: units.length-1}),
                {
                    minLength: 5
                }
            ),
            (arr: number[]) => {
                if (arr[0] === 0) return true;
                const bc = arr.map(i => units[i]);
                const nbc = nextBarcode(bc);
                const lastUnit = [bc.at(-1)!];
                const nextBarcodeLastUnit = nextBarcode(lastUnit);
                if (bc.at(-1) !== units.at(-1)) return nbc.join('').endsWith(nextBarcodeLastUnit.join(''))
                return nbc.join('').endsWith(nextBarcodeLastUnit.slice(1).join(''))
            }
        ),
        {
            verbose: true
        }
    );
})
