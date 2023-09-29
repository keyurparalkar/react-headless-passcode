export const ALPHANUMERIC_REGEX = /^[a-z0-9]$/i;

export const shouldPreventDefault = (
  keyCode: number,
  isAlphaNumeric: boolean = false,
  isMeta: boolean = false
) => {
  const isAlphabet = keyCode >= 64 && keyCode <= 90;

  // Below flag also checks if the typeed key is from numpad
  const isNumeric =
    (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);

  //Crtl + v:
  if (isMeta && keyCode === 86) {
    return false;
  }

  // By default we only allow numbers to be pressed
  if (isNumeric) return false;

  // We only allow alphabets to be pressed when the isAplhaNumeric flag is true
  if (isAlphabet && isAlphaNumeric) return false;

  // Backspace
  if (keyCode === 8) {
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
