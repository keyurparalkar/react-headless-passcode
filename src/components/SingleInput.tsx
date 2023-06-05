import {
  BaseSyntheticEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

type InputProps = {
  value: number;
  index: number;
  currFocusedIndex: number;
  setArrayValue: Dispatch<SetStateAction<number[]>>;
  setCurrFocusedIndex: Dispatch<SetStateAction<number>>;
};
const SingleInput = ({
  index,
  currFocusedIndex,
  setArrayValue,
  setCurrFocusedIndex,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocusChange = (e: BaseSyntheticEvent) => {
    if (index === currFocusedIndex) {
      setCurrFocusedIndex(index);
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (index === 0) {
        setCurrFocusedIndex(0);
      } else {
        setCurrFocusedIndex(index - 1);
      }
    } else {
      // Change the arrayValue and update focus only when number key is pressed
      if (parseInt(e.key) && index <= 4) {
        setArrayValue((preValue: number[]) => {
          const newArray = [...preValue];
          newArray[index] = parseInt(e.key);
          return newArray;
        });
        // setInputVal(e.key);
        setCurrFocusedIndex(index + 1);
      }
    }
  };

  // Preventing typing of any other keys except for 1 to 9 And backspace
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!parseInt(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (inputRef && inputRef.current && index === currFocusedIndex) {
      inputRef.current.focus();
    }
  }, [currFocusedIndex, index]);

  return (
    <input
      className="single-input"
      key={`index-${index}`}
      ref={inputRef}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={1}
      pattern="\d{1}"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onFocus={onFocusChange}
    />
  );
};

export default SingleInput;
