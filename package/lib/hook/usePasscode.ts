import {
  BaseSyntheticEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  ALPHANUMERIC_REGEX,
  getClipboardContent,
  getClipboardReadPermission,
  getFilledArray,
  shouldPreventDefault,
} from "../utils";

type PasscodeProps = {
  noOfInputs: number;
  isAlphaNumeric?: boolean;
};

const usePasscode = (props: PasscodeProps) => {
  const { noOfInputs, isAlphaNumeric = false } = props;
  const filledArray = useMemo(
    () => Array(noOfInputs).fill("", 0, noOfInputs),
    [noOfInputs]
  );
  const [array, setArray] = useState(filledArray);
  const [currentFocusedIndex, setCurrentFocusedIndex] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement> | []>([]);

  const isComplete = array?.every((value: string | number) => value !== "");

  /**
   * A function that returns the necessary event handlers based on index.
   */
  const getEventHandlers = (index: number) => {
    const onChange = (e: BaseSyntheticEvent) => {
      // Change the arrayValue and update only when number key is pressed
      setArray((preValue: (string | number)[]) => {
        const newArray = [...preValue];

        if (parseInt(e.target.value)) {
          newArray[index] = parseInt(e.target.value);
        } else {
          newArray[index] = e.target.value;
        }

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
          if (inputRefs && inputRefs.current && index === currentFocusedIndex) {
            inputRefs.current[index - 1].focus();
          }
        }
      } else {
        /**
         * Update focus only when number key is pressed
         * We do a -2 below because we don't want the last input to update the currentFocusedIndex
         * If we allow it then we get array out of bound error.
         * */
        if (
          (isAlphaNumeric ? ALPHANUMERIC_REGEX.test(e.key) : parseInt(e.key)) &&
          index <= array.length - 2
        ) {
          setCurrentFocusedIndex(index + 1);
          if (inputRefs && inputRefs.current && index === currentFocusedIndex) {
            inputRefs.current[index + 1].focus();
          }
        }
      }
    };

    // Preventing typing of any other keys except for 1 to 9 And backspace
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (shouldPreventDefault(e.which, isAlphaNumeric, e.metaKey)) {
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
        // We convert the clipboard conent into an array of string or number depending upon isAlphaNumeric;
        let newArray: Array<string | number> = clipboardContent.split("");
        newArray = isAlphaNumeric
          ? newArray
          : newArray.map((num) => Number(num));
        /**
         * We start pasting the clipboard content from the currentFocusedIndex with the help of below block.
         * Pasting of this content is stopped when the last input is reached.
         **/
        const filledArray = getFilledArray(
          array,
          newArray,
          currentFocusedIndex
        );
        setArray(filledArray);

        // Below we update the current focused index and also focus to the last input
        if (newArray.length < array.length && currentFocusedIndex === 0) {
          setCurrentFocusedIndex(newArray.length - 1);
          inputRefs.current[newArray.length - 1].focus();
        } else {
          setCurrentFocusedIndex(array.length - 1);
          inputRefs.current[array.length - 1].focus();
        }
      } catch (err) {
        console.error(err);
      }
    });

    return () => {
      document.removeEventListener("paste", () =>
        console.log("Removed paste listner")
      );
    };
  }, [currentFocusedIndex, array, isAlphaNumeric]);

  return {
    array,
    setArray,
    currentFocusedIndex,
    setCurrentFocusedIndex,
    getEventHandlers,
    isComplete,
    refs: inputRefs,
  };
};

export default usePasscode;
