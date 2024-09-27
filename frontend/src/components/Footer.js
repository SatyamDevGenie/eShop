import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      justifyContent="center"
      py="7"
      bgColor="black"
      color="whitesmoke"
      mt="4"
    >
      <Text color="whitesmoke" fontFamily="Verdana" fontSize="1.1rem">
        Copyrights {new Date().getFullYear()} || Alpha Cart || All Rights
        Reserved
      </Text>
    </Flex>
  );
};

export default Footer;
