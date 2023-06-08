import React, {
  BaseSyntheticEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getClipboardContent,
  getClipboardReadPermission,
  getPartialFilledArray,
} from "../utils";

type OtpProps = {
  arrayValue: (number | string)[];
  inputRef: React.RefObject<HTMLInputElement>;
};

const useOtp = (props: OtpProps) => {
  const { arrayValue, inputRef } = props;
  const [array, setArray] = useState(arrayValue);
  const [currentForcusedIndex, setCurrentFocusedIndex] = useState(0);
  const [inputIndex, setinputIndex] = useState(0);

  const getEventHandlers = (index: number) => {
    const onChange = (e: BaseSyntheticEvent) => {
      // Change the arrayValue and update only when number key is pressed
      setArray((preValue: (string | number)[]) => {
        const newArray = [...preValue];
        newArray[index] = e.target.value === "" ? "" : parseInt(e.target.value);
        return newArray;
      });
    };

    const onFocusChange = (e: BaseSyntheticEvent) => {
      setCurrentFocusedIndex(index);
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (index === 0) {
          setCurrentFocusedIndex(0);
        } else {
          setCurrentFocusedIndex(index - 1);
        }
      } else {
        // Update focus only when number key is pressed
        if (parseInt(e.key) && index <= 4) {
          setCurrentFocusedIndex(index + 1);
        }
      }
      setinputIndex(index);
    };

    // Preventing typing of any other keys except for 1 to 9 And backspace
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (
        !parseInt(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Meta" &&
        e.key !== "v"
      ) {
        e.preventDefault();
      }
    };

    return {
      onKeyUp,
      onKeyDown,
      onFocusChange,
      onChange,
    };
  };

  useEffect(() => {
    if (inputRef && inputRef.current && inputIndex === currentForcusedIndex) {
      inputRef.current.focus();
    }
  }, [currentForcusedIndex, inputIndex]);

  useEffect(() => {
    document.addEventListener("paste", async () => {
      const copyPermission = await getClipboardReadPermission();
      if (copyPermission.state === "denied") {
        throw new Error("Not allowed to read clipboard.");
      }

      const clipboardContent = await getClipboardContent();
      try {
        const newArray = clipboardContent.split("").map((num) => Number(num));

        if (currentForcusedIndex > 0) {
          const partiallyFilledArray = getPartialFilledArray(
            arrayValue as number[],
            newArray,
            currentForcusedIndex
          );
          setArray(partiallyFilledArray);
        } else {
          setArray(newArray);
        }

        setCurrentFocusedIndex(newArray.length - 1);
      } catch (err) {
        console.error(err);
      }
    });

    return () => {
      window.removeEventListener("paste", () =>
        console.log("Removed paste listner")
      );
    };
  }, [currentForcusedIndex]);

  return {
    array,
    setArray,
    currentForcusedIndex,
    setCurrentFocusedIndex,
    getEventHandlers,
  };
};

export default useOtp;
