import { useEffect, useState } from "react";
import SingleInput from "./SingleInput";

const getClipboardReadPermission = () => {
  return navigator.permissions.query({
    name: "clipboard-read" as PermissionName,
  });
};

const getClipboardContent = () => {
  return navigator.clipboard.readText();
};

/**
 *
 * @param arr
 * @param currentFocusedIndex
 * This function will return the partially filled array when focused index is apart from 0.
 * The array before the focused index will be filled with existing values.
 */
const getPartialFilledArray = (
  arr: number[],
  pastingArr: number[],
  currentFocusedIndex: number
) => {
  const lastIndex = arr.length - 1;
  const remainingPlaces = lastIndex - currentFocusedIndex;
  const partialArray = pastingArr.slice(0, remainingPlaces + 1);
  return [...arr.slice(0, currentFocusedIndex), ...partialArray];
};

const Otp = () => {
  const [arrayValue, setArrayValue] = useState<(string | number)[]>([
    0, 0, 0, 0, 0,
  ]);
  const [currFocusedIndex, setCurrFocusedIndex] = useState(0);

  useEffect(() => {
    document.addEventListener("paste", async () => {
      const copyPermission = await getClipboardReadPermission();
      if (copyPermission.state === "denied") {
        throw new Error("Not allowed to read clipboard.");
      }

      const clipboardContent = await getClipboardContent();
      try {
        const newArray = clipboardContent.split("").map((num) => Number(num));

        if (currFocusedIndex > 0) {
          const partiallyFilledArray = getPartialFilledArray(
            arrayValue as number[],
            newArray,
            currFocusedIndex
          );
          setArrayValue(partiallyFilledArray);
        } else {
          setArrayValue(newArray);
        }

        setCurrFocusedIndex(newArray.length - 1);
      } catch (err) {
        console.error(err);
      }
    });

    return () => {
      window.removeEventListener("paste", () =>
        console.log("Removed paste listner")
      );
    };
  }, [currFocusedIndex]);

  return (
    <>
      <h2>{arrayValue}</h2>
      <h3>Focused Index: {currFocusedIndex}</h3>
      {arrayValue.map((item, index) => (
        <SingleInput
          key={`index-${index}`}
          index={index}
          value={item}
          currFocusedIndex={currFocusedIndex}
          setArrayValue={setArrayValue}
          setCurrFocusedIndex={setCurrFocusedIndex}
        />
      ))}
    </>
  );
};

export default Otp;
