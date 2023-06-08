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
export const getPartialFilledArray = (
  arr: number[],
  pastingArr: number[],
  currentFocusedIndex: number
) => {
  const lastIndex = arr.length - 1;
  const remainingPlaces = lastIndex - currentFocusedIndex;
  const partialArray = pastingArr.slice(0, remainingPlaces + 1);
  return [...arr.slice(0, currentFocusedIndex), ...partialArray];
};
