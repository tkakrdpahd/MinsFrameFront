"use client";
import { Flex, Button, Heading, Text } from "@radix-ui/themes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/fsd/app/store";
import { down, init, up } from "@/fsd/app/slices/counterSlice";

export default function Counter() {
  const dispach = useDispatch();
  const count = useSelector((state: RootState) => {
    return state.counter.value;
  });
  const addNumber = () => {
    dispach(up(2));
  };
  const minusNumber = () => {
    dispach(down(2));
  };
  const initNumber = () => {
    dispach(init());
  };

  return (
    <Flex direction="column" align="center" p="4" gap="2">
      <Heading>Redux-Toolkit Tester</Heading>
      <Text size="3" weight="regular">{count}</Text>
      <Flex gap="2">
        <Button onClick={addNumber}>+</Button>
        <Button onClick={minusNumber}>-</Button>
        <Button onClick={initNumber}>초기화</Button>
      </Flex>
    </Flex>
  );
}