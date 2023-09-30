import "@testing-library/jest-dom";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import usePasscode from "./usePasscode";

const TestComponent = (props: { isAlphaNumeric: boolean }) => {
    const { array, getEventHandlers, refs } = usePasscode({
        noOfInputs: 4,
        isAlphaNumeric: props.isAlphaNumeric,
    });

    return (
        <>
            {array.map((value: string | number, index: number) => (
                <input
                    ref={(el) => el && (refs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    pattern="\d{1}"
                    value={String(value)}
                    key={`index-${index}`}
                    data-testid={`index-${index}`}
                    {...getEventHandlers(index)}
                />
            ))}
        </>
    );
};

describe("test basic workflow", () => {
    it("1. test whether passing no. of inputs creates an array of equal number ", () => {
        const { result } = renderHook(() => usePasscode({ noOfInputs: 4 }));
        expect(result.current.array).toHaveLength(4);
    });

    it("2. test if the focus changes to next element when typed", async () => {
        render(<TestComponent isAlphaNumeric={false} />);
        // focus on the first input
        const firstInput: HTMLInputElement = screen.getByTestId("index-0");
        firstInput.focus();
        expect(firstInput).toHaveFocus();

        //Type in first input and check the focus of next input
        userEvent.type(firstInput, "1");
        const secondtInput: HTMLInputElement = screen.getByTestId("index-1");
        await waitFor(() => {
            expect(secondtInput).toHaveFocus();
        });
    });

    it("3. test if the focus changes to previous element when backspaced", async () => {
        render(<TestComponent isAlphaNumeric={false} />);
        // focus on the first input
        const firstInput: HTMLInputElement = screen.getByTestId("index-0");
        firstInput.focus();

        //Type in first input and check the focus of next input
        userEvent.type(firstInput, "1");
        const secondtInput: HTMLInputElement = screen.getByTestId("index-1");
        await waitFor(() => {
            expect(secondtInput).toHaveFocus();
        });

        //Backspace and observe focus shift
        userEvent.keyboard("{Backspace}");
        await waitFor(() => {
            expect(firstInput).toHaveFocus();
        });
    });
});
