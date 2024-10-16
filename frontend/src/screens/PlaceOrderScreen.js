import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, currVal) => acc + currVal.price * +currVal.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice < 10000 ? 5000 : 0;
  cart.taxPrice = (18 * cart.itemsPrice) / 100;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order, userInfo]);

  return (
    <Flex w="full" direction="column" py="10">
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap="12">
        {/* Column 1 - Order Details */}
        <Flex direction="column">
          {/* Shipping Section */}
          <Box borderBottom="1px solid" py="6" borderColor="gray.300">
            <Heading as="h2" mb="4" fontSize="2xl" fontWeight="bold">
              Shipping
            </Heading>
            <Text>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Text>
          </Box>

          {/* Payment Method Section */}
          <Box borderBottom="1px solid" py="6" borderColor="gray.300">
            <Heading as="h2" mb="4" fontSize="2xl" fontWeight="bold">
              Payment Method
            </Heading>
            <Text>
              <strong>Method: </strong> {cart.paymentMethod.toUpperCase()}
            </Text>
          </Box>

          {/* Order Items Section */}
          <Box borderBottom="1px solid" py="6" borderColor="gray.300">
            <Heading as="h2" mb="4" fontSize="2xl" fontWeight="bold">
              Order Items
            </Heading>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <Box>
                {cart.cartItems.map((item, idx) => (
                  <Flex
                    key={idx}
                    justifyContent="space-between"
                    alignItems="center"
                    py="4"
                  >
                    <Flex alignItems="center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        w="12"
                        h="12"
                        objectFit="cover"
                        mr="4"
                      />
                      <Link
                        as={RouterLink}
                        to={`/products/${item.product}`}
                        fontWeight="bold"
                        fontSize="lg"
                        _hover={{ color: "teal.500" }}
                      >
                        {item.name}
                      </Link>
                    </Flex>
                    <Text fontWeight="semibold" fontSize="lg">
                      {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
                    </Text>
                  </Flex>
                ))}
              </Box>
            )}
          </Box>
        </Flex>

        {/* Column 2 - Order Summary */}
        <Flex
          direction="column"
          bgColor={useColorModeValue("white", "gray.700")}
          shadow="lg"
          rounded="lg"
          py="8"
          px="6"
          justifyContent="space-between"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Box>
            <Heading as="h2" fontSize="2xl" fontWeight="bold" mb="6">
              Order Summary
            </Heading>

            {/* Items Price */}
            <Flex justifyContent="space-between" py="2">
              <Text fontSize="lg">Items</Text>
              <Text fontWeight="bold" fontSize="lg">
                ₹{cart.itemsPrice}
              </Text>
            </Flex>
            <Divider />

            {/* Shipping Price */}
            <Flex justifyContent="space-between" py="2">
              <Text fontSize="lg">Shipping</Text>
              <Text fontWeight="bold" fontSize="lg">
                ₹{cart.shippingPrice}
              </Text>
            </Flex>
            <Divider />

            {/* Tax Price */}
            <Flex justifyContent="space-between" py="2">
              <Text fontSize="lg">Tax</Text>
              <Text fontWeight="bold" fontSize="lg">
                ₹{cart.taxPrice}
              </Text>
            </Flex>
            <Divider />

            {/* Total Price */}
            <Flex justifyContent="space-between" py="2">
              <Text fontSize="lg">Total</Text>
              <Text fontWeight="bold" fontSize="lg">
                ₹{cart.totalPrice}
              </Text>
            </Flex>
          </Box>

          {/* Place Order Button */}
          <Button
            size="lg"
            colorScheme="teal"
            w="full"
            mt="6"
            textTransform="uppercase"
            onClick={placeOrderHandler}
            isDisabled={cart.cartItems.length === 0}
            _hover={{ bg: "teal.600" }}
          >
            Place Order
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default PlaceOrderScreen;






// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Heading,
//   Image,
//   Link,
//   Text,
// } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useNavigate } from "react-router-dom";

// import { createOrder } from "../actions/orderActions";
// import CheckoutSteps from "../components/CheckoutSteps";
// import Message from "../components/Message";

// const PlaceOrderScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);

//   cart.itemsPrice = cart.cartItems.reduce(
//     (acc, currVal) => acc + currVal.price * +currVal.qty,
//     0
//   );
//   cart.shippingPrice = cart.itemsPrice < 10000 ? 5000 : 0;
//   cart.taxPrice = (18 * cart.itemsPrice) / 100;
//   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

//   const orderCreate = useSelector((state) => state.orderCreate);
//   const { order, success } = orderCreate;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const placeOrderHandler = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       })
//     );
//   };
//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     }
//     if (success) {
//       navigate(`/order/${order._id}`);
//     }
//   }, [navigate, success, order, userInfo]);

//   return (
//     <Flex w="full" direction="column" py="5">
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Grid templateColumns={{ sm: "1fr", xl: "3fr 2fr" }} gap="20">
//         {/* Column 1 */}
//         <Flex direction="column">
//           {/* Shipping */}
//           <Box borderBottom="1px" py="6" borderColor="gray.300">
//             <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
//               Shipping
//             </Heading>
//             <Text>
//               <strong>Address: </strong>
//               {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
//               {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
//             </Text>
//           </Box>

//           {/* Payment Method */}
//           <Box borderBottom="1px" py="6" borderColor="gray.300">
//             <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
//               Payment Method
//             </Heading>
//             <Text>
//               <strong>Method: </strong>
//               {cart.paymentMethod.toUpperCase()}
//             </Text>
//           </Box>

//           {/* Order Items */}
//           <Box borderBottom="1px" py="6" borderColor="gray.300">
//             <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
//               Order Items
//             </Heading>
//             <Box>
//               {cart.cartItems.length === 0 ? (
//                 <Message>Your cart is empty</Message>
//               ) : (
//                 <Box py="2">
//                   {cart.cartItems.map((item, idx) => (
//                     <Flex
//                       key={idx}
//                       alignItems="center"
//                       justifyContent="space-between"
//                     >
//                       <Flex py="2" alignItems="center">
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           w="12"
//                           h="12"
//                           objectFit="cover"
//                           mr="6"
//                         />
//                         <Link
//                           fontWeight="bold"
//                           fontSize="xl"
//                           as={RouterLink}
//                           to={`/products/${item.product}`}
//                         >
//                           {item.name}
//                         </Link>
//                       </Flex>

//                       <Text fontSize="lg" fontWeight="semibold">
//                         {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
//                       </Text>
//                     </Flex>
//                   ))}
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         </Flex>

//         {/* Column 2 */}
//         <Flex
//           direction="column"
//           bgColor="white"
//           justifyContent="space-between"
//           py="8"
//           px="8"
//           shadow="md"
//           rounded="lg"
//           borderColor="gray.300"
//         >
//           <Box>
//             <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
//               Order Summary
//             </Heading>

//             {/* Items Price */}
//             <Flex
//               borderBottom="1px"
//               py="2"
//               borderColor="gray.200"
//               alignitems="center"
//               justifyContent="space-between"
//             >
//               <Text fontSize="xl">Items</Text>
//               <Text fontWeight="bold" fontSize="xl">
//                 ₹{cart.itemsPrice}
//               </Text>
//             </Flex>

//             {/* Shipping Price */}
//             <Flex
//               borderBottom="1px"
//               py="2"
//               borderColor="gray.200"
//               alignitems="center"
//               justifyContent="space-between"
//             >
//               <Text fontSize="xl">Shipping</Text>
//               <Text fontWeight="bold" fontSize="xl">
//                 ₹{cart.shippingPrice}
//               </Text>
//             </Flex>

//             {/* Tax Price */}
//             <Flex
//               borderBottom="1px"
//               py="2"
//               borderColor="gray.200"
//               alignitems="center"
//               justifyContent="space-between"
//             >
//               <Text fontSize="xl">Tax</Text>
//               <Text fontWeight="bold" fontSize="xl">
//                 ₹{cart.taxPrice}
//               </Text>
//             </Flex>

//             {/* Total Price */}
//             <Flex
//               borderBottom="1px"
//               py="2"
//               borderColor="gray.200"
//               alignitems="center"
//               justifyContent="space-between"
//             >
//               <Text fontSize="xl">Total</Text>
//               <Text fontWeight="bold" fontSize="xl">
//                 ₹{cart.totalPrice}
//               </Text>
//             </Flex>
//           </Box>
//           <Button
//             size="lg"
//             textTransform="uppercase"
//             colorScheme="yellow"
//             type="button"
//             w="full"
//             onClick={placeOrderHandler}
//             disabled={cart.cartItems === 0}
//           >
//             Place Order
//           </Button>
//         </Flex>
//       </Grid>
//     </Flex>
//   );
// };

// export default PlaceOrderScreen;
