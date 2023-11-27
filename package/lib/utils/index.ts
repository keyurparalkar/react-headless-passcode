export const ALPHANUMERIC_REGEX = /^[a-z0-9]$/i;


export const isNumeric = (key: string) => !isNaN(Number(key))

export const shouldPreventDefault = (
    key: string,
    isAlphaNumeric: boolean = false,
    isMeta: boolean = false
) => {
    // Check if the key is a number
    const isKeyNumeric = isNumeric(key);
    // By default we only allow numbers to be pressed = DONE
    if (isKeyNumeric) return false;

    // Crtl + V
    if (isMeta && key === "v") return false;

    // Allow Backspace
    if (key === "Backspace") return false;

    // We only allow alphabets to be pressed when the isAplhaNumeric flag is true = DONE
    if (isAlphaNumeric && !isKeyNumeric) {
        return false;
    }

    return true;
};

export const getClipboardReadPermission = () => {
    return navigator.permissions.query({
        name: "clipboard-read" as PermissionName,
    });
};

export const getClipboardContent = () => {
    return navigator.clipboard.readText();
};

/**
 *
 * @param arr
 * @param currentFocusedIndex
 * This function will return the partially filled array when focused index is apart from 0.
 * The array before the focused index will be filled with existing values.
 */
export const getFilledArray = (
    arr: (number | string)[],
    pastingArr: (number | string)[],
    currentFocusedIndex: number
) => {
    const lastIndex = arr.length - 1;

    if (currentFocusedIndex > 0) {
        for (let i = currentFocusedIndex; i <= lastIndex; i++) {
            arr[i] = pastingArr[i - currentFocusedIndex] ?? "";
        }
        return arr;
    } else {
        // Starts pasting the values in the array from 0th index
        return [...pastingArr, ...arr.slice(pastingArr.length - 1, lastIndex)];
    }
};
