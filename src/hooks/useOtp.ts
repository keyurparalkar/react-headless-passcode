import {
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
};

const useOtp = (props: OtpProps) => {
  const { arrayValue } = props;
  const [array, setArray] = useState(arrayValue);
  const [currentForcusedIndex, setCurrentFocusedIndex] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement> | []>([]);

  const getEventHandlers = (index: number) => {
    const onChange = (e: BaseSyntheticEvent) => {
      // Change the arrayValue and update only when number key is pressed
      setArray((preValue: (string | number)[]) => {
        const newArray = [...preValue];
        newArray[index] = e.target.value === "" ? "" : parseInt(e.target.value);
        return newArray;
      });
    };

    const onFocus = (e: BaseSyntheticEvent) => {
      setCurrentFocusedIndex(index);
      e.target.focus();
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (index === 0) {
          setCurrentFocusedIndex(0);
        } else {
          setCurrentFocusedIndex(index - 1);
          if (
            inputRefs &&
            inputRefs.current &&
            index === currentForcusedIndex
          ) {
            inputRefs.current[index - 1].focus();
          }
        }
      } else {
        /**
         * Update focus only when number key is pressed
         * We do a -2 below because we don't want the last input to update the currentFocusedIndex
         * If we allow it then we get array out of bound error.
         * */
        if (parseInt(e.key) && index <= array.length - 2) {
          setCurrentFocusedIndex(index + 1);
          if (
            inputRefs &&
            inputRefs.current &&
            index === currentForcusedIndex
          ) {
            inputRefs.current[index + 1].focus();
          }
        }
      }
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
      onFocus,
      onChange,
    };
  };

  useEffect(() => {
    document.addEventListener("paste", async () => {
      const copyPermission = await getClipboardReadPermission();
      if (copyPermission.state === "denied") {
        throw new Error("Not allowed to read clipboard.");
      }

      const clipboardContent = await getClipboardContent();
      try {
        // We convert the clipboard conent into an array of number;
        const newArray = clipboardContent.split("").map((num) => Number(num));

        if (currentForcusedIndex > 0) {
          const partiallyFilledArray = getPartialFilledArray(
            array as number[],
            newArray,
            currentForcusedIndex
          );
          setArray(partiallyFilledArray);
        } else {
          setArray(newArray);
        }

        setCurrentFocusedIndex(newArray.length - 1);
        inputRefs.current[newArray.length - 1].focus();
      } catch (err) {
        console.error(err);
      }
    });

    return () => {
      window.removeEventListener("paste", () =>
        console.log("Removed paste listner")
      );
    };
  }, [currentForcusedIndex, array]);

  return {
    array,
    setArray,
    currentForcusedIndex,
    setCurrentFocusedIndex,
    getEventHandlers,
    refs: inputRefs,
  };
};

export default useOtp;
