import { createContext, useEffect, useState } from "react";
import SingleInput from "./SingleInput";

const getClipboardReadPermission = () => {
  return navigator.permissions.query({ name: "clipboard-read" });
};

const getClipboardContent = () => {
  return navigator.clipboard.readText();
};

export const OtpContext = createContext<{
  value: number[];
  cursorPos: number;
}>({
  value: [0, 0, 0, 0, 0],
  cursorPos: 0,
});

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
        setArrayValue(newArray);
      } catch (err) {
        console.error(err);
      }
    });

    return () => {
      window.removeEventListener("paste", () =>
        console.log("Removed paste listner")
      );
    };
  }, []);

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
