import { useEffect, useRef, useState } from "react";
import useOtp from "../hooks/useOtp";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { array, setArray, currentForcusedIndex, setCurrentFocusedIndex, getEventHandlers } =
    useOtp({ arrayValue: [0, 0, 0, 0, 0], inputRef});

  return (
    <>
      <h2>{array}</h2>
      <h3>Focused Index: {currentForcusedIndex}</h3>
      {array.map((item, index) => (
        <SingleInput
          key={`index-${index}`}
          ref={inputRef}
          index={index}
          value={item}
          currFocusedIndex={currentForcusedIndex}
          setArrayValue={setArray}
          setCurrFocusedIndex={setCurrentFocusedIndex}
          {...getEventHandlers(index)}
        />
      ))}
    </>
  );
};

export default Otp;
