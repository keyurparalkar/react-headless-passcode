import useOtp from "../hooks/useOtp";

const Otp = () => {
  const { array, currentForcusedIndex, getEventHandlers, refs, isComplete } =
    useOtp({
      arrayValue: [0, 0, 0, 0, 0, 0],
      isAlphaNumeric: false,
    });

  return (
    <>
      <h2>{array}</h2>
      <h3>isComplete: {`${isComplete}`}</h3>
      <h3>Focused Index: {currentForcusedIndex}</h3>
      {array.map((value, index) => {
        const { ...rest } = getEventHandlers(index);
        return (
          <input
            className="single-input"
            ref={(el) => el && (refs.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            pattern="\d{1}"
            value={String(value)}
            key={`index-${index}`}
            {...rest}
          />
        );
      })}
    </>
  );
};

export default Otp;
