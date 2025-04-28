import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Select,
  Text,
  VStack,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, +qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };

  return (
    <Box maxW="7xl" mx="auto" py="10" px="4">
      <Heading as="h1" mb="8" fontWeight="bold" fontSize="3xl">
        Shopping Cart
      </Heading>
      <Flex direction="column" gap="8" w="full">
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <Grid
            templateColumns={{ sm: "1fr", md: "2fr 1fr", lg: "3fr 1fr" }}
            gap="8"
            w="full"
          >
            {/* Column 1: Cart Items */}
            <VStack spacing="6" w="full">
              {cartItems.map((item) => (
                <Grid
                  key={item.product}
                  templateColumns={{
                    sm: "1fr",
                    md: "1fr 3fr 1fr 1fr",
                  }}
                  gap="6"
                  alignItems="center"
                  w="full"
                  p="4"
                  borderRadius="lg"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  bg="white"
                >
                  {/* Product Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    borderRadius="md"
                    height="16"
                    objectFit="cover"
                    width="16"
                  />

                  {/* Product Name */}
                  <Text fontWeight="medium" fontSize="lg" noOfLines={2}>
                    <Link as={RouterLink} to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Text>

                  {/* Product Price */}
                  <Text fontWeight="bold" fontSize="lg" color="blue.600">
                    ₹{item.price}
                  </Text>

                  {/* Quantity Select Box */}
                  <Select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, +e.target.value))
                    }
                    width="70px"
                    variant="outline"
                    size="sm"
                    fontWeight="semibold"
                  >
                    {[...Array(item.countInStock).keys()].map((i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </Select>

                  {/* Remove Item Button */}
                  <Button
                    type="button"
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => removeFromCartHandler(item.product)}
                    _hover={{ bgColor: "red.600", color: "white" }}
                  >
                    <Icon as={IoTrashBinSharp} />
                  </Button>
                </Grid>
              ))}
            </VStack>

            {/* Column 2: Cart Summary */}
            <Flex
              direction="column"
              bg="gray.50"
              p="8"
              borderRadius="lg"
              boxShadow="md"
              position="sticky"
              top="10"
              alignItems="center"
            >
              <Heading as="h2" fontSize="2xl" mb="4" fontWeight="bold">
                Cart Summary
              </Heading>
              <Text fontWeight="bold" fontSize="lg" color="gray.700" mb="4">
                Subtotal (
                {cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)}{" "}
                items)
              </Text>
              <Text fontWeight="bold" fontSize="3xl" color="green.600" mb="6">
                ₹{" "}
                {cartItems.reduce(
                  (acc, currVal) => acc + currVal.price * currVal.qty,
                  0
                )}
              </Text>
              <Stack direction="column" spacing="4" w="full">
                <Button
                  type="button"
                  size="lg"
                  colorScheme="teal"
                  isDisabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  _hover={{ bgColor: "teal.700" }}
                  w="full"
                >
                  Proceed to Checkout
                </Button>

                {/* Divider */}
                <Divider />

                <Button
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  w="full"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </Stack>
            </Flex>
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default CartScreen;







// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Heading,
//   Icon,
//   Image,
//   Link,
//   Select,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { IoTrashBinSharp } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Link as RouterLink,
//   useNavigate,
//   useParams,
//   useSearchParams,
// } from "react-router-dom";
// import { addToCart, removeFromCart } from "../actions/cartActions";
// import Message from "../components/Message";

// const CartScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [searchParams] = useSearchParams();
//   const qty = searchParams.get("qty");

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   useEffect(() => {
//     if (id) {
//       dispatch(addToCart(id, +qty));
//     }
//   }, [dispatch, id, qty]);

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     navigate(`/login?redirect=/shipping`);
//   };

//   return (
//     <Box maxW="7xl" mx="auto" py="10" px="4">
//       <Heading as="h1" mb="8" fontWeight="bold" fontSize="3xl">
//         Shopping Cart
//       </Heading>
//       <Flex>
//         {cartItems.length === 0 ? (
//           <Message>Your cart is empty</Message>
//         ) : (
//           <Grid
//             templateColumns={{ sm: "1fr", md: "2fr 1fr", lg: "3fr 1fr" }}
//             gap="8"
//             w="full"
//           >
//             {/* Column 1: Cart Items */}
//             <VStack spacing="6" w="full">
//               {cartItems.map((item) => (
//                 <Grid
//                   key={item.product}
//                   templateColumns={{
//                     sm: "1fr",
//                     md: "1fr 3fr 1fr 1fr 1fr",
//                   }}
//                   gap="6"
//                   alignItems="center"
//                   w="full"
//                   p="4"
//                   borderRadius="lg"
//                   boxShadow="sm"
//                   _hover={{ boxShadow: "md" }}
//                   bg="white"
//                 >
//                   {/* Product Image */}
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     borderRadius="md"
//                     height="16"
//                     objectFit="cover"
//                     width="16"
//                   />

//                   {/* Product Name */}
//                   <Text fontWeight="medium" fontSize="lg" noOfLines={2}>
//                     <Link as={RouterLink} to={`/product/${item.product}`}>
//                       {item.name}
//                     </Link>
//                   </Text>

//                   {/* Product Price */}
//                   <Text fontWeight="bold" fontSize="lg" color="blue.600">
//                     ₹{item.price}
//                   </Text>

//                   {/* Quantity Select Box */}
//                   <Select
//                     value={item.qty}
//                     onChange={(e) =>
//                       dispatch(addToCart(item.product, +e.target.value))
//                     }
//                     width="70px"
//                     variant="outline"
//                     size="sm"
//                     fontWeight="semibold"
//                   >
//                     {[...Array(item.countInStock).keys()].map((i) => (
//                       <option key={i + 1}>{i + 1}</option>
//                     ))}
//                   </Select>

//                   {/* Remove Item Button */}
//                   <Button
//                     type="button"
//                     size="sm"
//                     colorScheme="red"
//                     variant="outline"
//                     onClick={() => removeFromCartHandler(item.product)}
//                     _hover={{ bgColor: "red.600", color: "white" }}
//                   >
//                     <Icon as={IoTrashBinSharp} />
//                   </Button>
//                 </Grid>
//               ))}
//             </VStack>

//             {/* Column 2: Cart Summary */}
//             <Flex
//               direction="column"
//               bg="gray.50"
//               p="8"
//               borderRadius="lg"
//               boxShadow="md"
//             >
//               <Heading as="h2" fontSize="2xl" mb="4" fontWeight="bold">
//                 Cart Summary
//               </Heading>
//               <Text fontWeight="bold" fontSize="lg" color="gray.700" mb="4">
//                 Subtotal (
//                 {cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)} items)
//               </Text>
//               <Text fontWeight="bold" fontSize="3xl" color="green.600" mb="6">
//                 ₹{" "}
//                 {cartItems.reduce(
//                   (acc, currVal) => acc + currVal.price * currVal.qty,
//                   0
//                 )}
//               </Text>

//               <Button
//                 type="button"
//                 size="lg"
//                 colorScheme="teal"
//                 isDisabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//                 _hover={{ bgColor: "teal.700" }}
//               >
//                 Proceed to Checkout
//               </Button>
//             </Flex>
//           </Grid>
//         )}
//       </Flex>
//     </Box>
//   );
// };

// export default CartScreen;







