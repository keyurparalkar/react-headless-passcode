import { shouldPreventDefault } from "./index";

describe("test shouldPreventDefault", () => {
    test("1. Should return false if key that is pressed is: Ctrl + V, Backspace, and digits 1-9 when isAlphaNumeric = false", () => {
        let key = "1";
        expect(shouldPreventDefault(key)).toBeFalsy();

        key = "0";
        expect(shouldPreventDefault(key)).toBeFalsy();

        key = "v";
        expect(shouldPreventDefault(key, false, true)).toBeFalsy();

        key = "Backspace";
        expect(shouldPreventDefault(key)).toBeFalsy();

        key = "a";
        expect(shouldPreventDefault(key)).toBeTruthy();
    });

    test("2. Should return false if key that is pressed is: Ctrl + V, Backspace, and digits 1-9 when isAlphaNumeric = true", () => {
        let key = "1";
        expect(shouldPreventDefault(key, true)).toBeFalsy();

        key = "v"; // Ctrl + v
        expect(shouldPreventDefault(key, true, true)).toBeFalsy();

        key = "Backspace";
        expect(shouldPreventDefault(key, true)).toBeFalsy();

        key = "a";
        expect(shouldPreventDefault(key, true)).toBeFalsy();
    });
});
