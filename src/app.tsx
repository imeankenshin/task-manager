// @refresh reload
import "./app.css";
import { Flex, VStack, styled } from "styled-system/jsx";

export default function App() {
  return (
    <VStack maxWidth="4xl" minH="screen" bgColor="warmGray.50">
      <Flex pt="16" w="full" px="8" justifyContent="center">
        <styled.input
          flex={8}
          maxW={674}
          autocomplete="off"
          aria-autocomplete="list"
          name="task"
          type="text"
          px="5"
          rounded="xl"
          fontSize="xl"
          h="14"
          w="full"
          bgColor="warmGray.200"
        />
      </Flex>
    </VStack>
  );
}
