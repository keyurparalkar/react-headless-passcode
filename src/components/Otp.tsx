import { createContext, useState } from "react";
import SingleInput from "./SingleInput";

export const OtpContext = createContext<{
  value: number[];
  cursorPos: number;
}>({
  value: [0, 0, 0, 0, 0],
  cursorPos: 0,
});

const Otp = () => {
  const [arrayValue, setArrayValue] = useState<number[]>([0, 0, 0, 0, 0]);
  const [currFocusedIndex, setCurrFocusedIndex] = useState(0);
  return (
    <>
      <h2>{arrayValue}</h2>
      <h3>Focused Index: {currFocusedIndex}</h3>
      {arrayValue.map((item, index) => (
        <>
          {" "}
          <SingleInput
            index={index}
            value={item}
            currFocusedIndex={currFocusedIndex}
            setArrayValue={setArrayValue}
            setCurrFocusedIndex={setCurrFocusedIndex}
          />
        </>
      ))}
    </>
  );
};

export default Otp;
