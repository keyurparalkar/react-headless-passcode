import {
  BaseSyntheticEvent,
  Dispatch,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

type InputProps = {
  value: number | string;
  index: number;
  currFocusedIndex: number;
  setArrayValue: Dispatch<SetStateAction<(string | number)[]>>;
  setCurrFocusedIndex: Dispatch<SetStateAction<number>>;
  onChange: (e: BaseSyntheticEvent) => void;
  onFocusChange: (e: BaseSyntheticEvent) => void;
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const SingleInput = (
  {
    value,
    index,
    currFocusedIndex,
    setArrayValue,
    setCurrFocusedIndex,
    onChange,
    onFocusChange,
    onKeyDown,
    onKeyUp
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  // const inputRef = useRef<HTMLInputElement>(null);

  // const onChange = (e: BaseSyntheticEvent) => {
  //   // Change the arrayValue and update only when number key is pressed
  //   setArrayValue((preValue: (string | number)[]) => {
  //     const newArray = [...preValue];
  //     newArray[index] = e.target.value === "" ? "" : parseInt(e.target.value);
  //     return newArray;
  //   });
  // };

  // const onFocusChange = (e: BaseSyntheticEvent) => {
  //   setCurrFocusedIndex(index);
  // };

  // const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Backspace") {
  //     if (index === 0) {
  //       setCurrFocusedIndex(0);
  //     } else {
  //       setCurrFocusedIndex(index - 1);
  //     }
  //   } else {
  //     // Update focus only when number key is pressed
  //     if (parseInt(e.key) && index <= 4) {
  //       setCurrFocusedIndex(index + 1);
  //     }
  //   }
  // };

  // // Preventing typing of any other keys except for 1 to 9 And backspace
  // const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (
  //     !parseInt(e.key) &&
  //     e.key !== "Backspace" &&
  //     e.key !== "Meta" &&
  //     e.key !== "v"
  //   ) {
  //     e.preventDefault();
  //   }
  // };

  // useEffect(() => {
  //   if (ref && ref.current && index === currFocusedIndex) {
  //     ref.current.focus();
  //   }
  // }, [currFocusedIndex, index]);

  return (
    <input
      className="single-input"
      ref={ref}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={1}
      pattern="\d{1}"
      value={String(value)}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onFocus={onFocusChange}
    />
  );
};

const ForwardedSingleInput = forwardRef(SingleInput);

export default ForwardedSingleInput;
