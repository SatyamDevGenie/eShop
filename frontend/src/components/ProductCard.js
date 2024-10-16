import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/products/${product._id}`}
      _hover={{ textDecoration: "none" }}
    >
      <Box
        borderRadius="lg"
        bgColor="white"
        overflow="hidden"
        _hover={{ shadow: "lg", transform: "scale(1.02)" }}
        transition="all 0.3s ease-in-out"
      >
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="350px"
          objectFit="cover"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        <Flex
          py="4"
          px="5"
          direction="column"
          justifyContent="space-between"
          h="150px"
        >
          <Heading
            as="h4"
            fontSize="lg"
            fontWeight="bold"
            fontFamily="Georgia, serif"
            textAlign="center"
            noOfLines={1}
            mb="3"
            color="gray.700"
          >
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
            <Rating value={product.rating} color="yellow.500" />
            <Text fontSize="xl" fontWeight="semibold" color="blue.600">
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProductCard;












// import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
// import Rating from "./Rating";
// import { Link as RouterLink } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   return (
//     <Link
//       as={RouterLink}
//       to={`/products/${product._id}`}
//       _hover={{ textDecor: "none" }}
//     >
//       <Box borderRadius="lg" bgColor="white" _hover={{ shadow: "md", opacity:"0.9" }}>
//         <Image
//           src={product.image}
//           alt={product.name}
//           w="full"
//           h="430px"
//           objectFit="cover"
//         />
//         <Flex py="5" px="4" direction="column" justifyContent="space-between">
//           <Heading as="h4" fontSize="md" fontWeight="bold" mb="3" fontFamily="Georgia" textAlign="center">
//             {product.name}
//           </Heading>
//           <Flex alignItems="center" justifyContent="space-between">
//             <Rating value={product.rating} color="yellow.500" />
//             <Text fontSize="4xl" fontWeight="bold" color="blue.600">
//               ₹{product.price}
//             </Text>
//           </Flex>
//         </Flex>
//       </Box>
//     </Link>
//   );
// };

// export default ProductCard;
