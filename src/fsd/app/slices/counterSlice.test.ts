// @/fsd/app/slices/counterSlice.test.ts
import counterSlice, { up, down, init } from "@/fsd/app/slices/counterSlice";

describe("counterSlice reducer", () => {
  const initialState = {
    id: 1,
    value: 0,
  };

  it("should return the initial state", () => {
    expect(counterSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it("should handle up", () => {
    const nextState = counterSlice.reducer(initialState, up(5));
    expect(nextState.value).toBe(5);
  });

  it("should handle down", () => {
    const modifiedState = { ...initialState, value: 10 };
    const nextState = counterSlice.reducer(modifiedState, down(4));
    expect(nextState.value).toBe(6);
  });

  it("should handle init", () => {
    const modifiedState = { ...initialState, value: 20 };
    const nextState = counterSlice.reducer(modifiedState, init());
    expect(nextState.value).toBe(0);
  });
});