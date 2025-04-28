import { Box, Button, Grid, Heading, Image, Text, VStack, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsList = useSelector((state) => state.productList);
  const { loading, error, products } = productsList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {/* Hero Section */}
      <Box
        py={{ base: "16", md: "24" }}
        textAlign="center"
        color="black"
      >
        <VStack spacing="6">
          <Heading fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}>
            Welcome to Our Store
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="2xl">
            Discover the best products at unbeatable prices. Shop now and enjoy our offers!
          </Text>
          <Button colorScheme="teal" size="lg" onClick={() => navigate("/cart")}>
            Shop Now
          </Button>
        </VStack>
      </Box>

      {/* Featured Products Heading */}
      <Box p={{ base: "6", md: "10" }}>
        <Heading as="h2" mb="8" fontSize={{ base: "2xl", md: "3xl" }} textAlign="center">
          Our Latest Products
        </Heading>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            gap={8}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Grid>
        )}
      </Box>

      {/* Promotional Section */}
      <Box
        mt="20"
        py="16"
        px="6"
        bg="gray.100"
        textAlign="center"
      >
        <Stack spacing="5" align="center">
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Special Offer: 20% Off on Your First Purchase!
          </Heading>
          <Text maxW="2xl" fontSize="lg">
            Sign up now and get an instant discount code. Start your shopping journey with amazing savings!
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default HomeScreen;








// import { Grid, Heading } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../actions/productActions";
// import ProductCard from "../components/ProductCard";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// const HomeScreen = () => {
//   const dispatch = useDispatch();

//   const productsList = useSelector((state) => state.productList);
//   const { loading, error, products } = productsList;

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   return (
//     <>
//       <Heading as="h2" mb="8" fontSize="1.7rem" mt="5">
//         Our Latest Products
//       </Heading>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <Grid
//           templateColumns={{
//             sm: "1fr",
//             md: "1fr 1fr",
//             lg: "1fr 1fr 1fr",
//             xl: "1fr 1fr 1fr 1fr",
//           }}
//           gap="10"
//         >
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </Grid>
//       )}
//     </>
//   );
// };

// export default HomeScreen;
