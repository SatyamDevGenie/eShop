import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const cardBg = useColorModeValue("white", "gray.700");

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <Flex w="full" py="8" direction="column">
      <Grid templateColumns={{ base: "1fr", md: "3fr 2fr" }} gap="8">
        {/* Left Side */}
        <VStack spacing="6" align="stretch">
          {/* Shipping Section */}
          <Box bg={cardBg} p="6" shadow="md" rounded="lg" borderWidth="1px">
            <Heading fontSize="2xl" mb="4">
              Shipping
            </Heading>
            <Text><strong>Name:</strong> {order.user.name}</Text>
            <Text>
              <strong>Email:</strong>{" "}
              <Link color="teal.500" href={`mailto:${order.user.email}`}>
                {order.user.email}
              </Link>
            </Text>
            <Text mt="2">
              <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </Text>
            <Box mt="4">
              {order.isDelivered ? (
                <Message type="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message type="warning">Not Delivered</Message>
              )}
            </Box>
          </Box>

          {/* Payment Section */}
          <Box bg={cardBg} p="6" shadow="md" rounded="lg" borderWidth="1px">
            <Heading fontSize="2xl" mb="4">
              Payment Method
            </Heading>
            <Text><strong>Method:</strong> {order.paymentMethod.toUpperCase()}</Text>
            <Box mt="4">
              {order.isPaid ? (
                <Message type="success">Paid on {new Date(order.paidAt).toUTCString()}</Message>
              ) : (
                <Message type="warning">Not Paid</Message>
              )}
            </Box>
          </Box>

          {/* Order Items Section */}
          <Box bg={cardBg} p="6" shadow="md" rounded="lg" borderWidth="1px">
            <Heading fontSize="2xl" mb="4">
              Order Items
            </Heading>
            {order.orderItems.length === 0 ? (
              <Message>No Order Info</Message>
            ) : (
              <VStack spacing="4" align="stretch">
                {order.orderItems.map((item, idx) => (
                  <Flex key={idx} align="center" justify="space-between">
                    <Flex align="center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="50px"
                        objectFit="cover"
                        mr="4"
                        rounded="md"
                      />
                      <Link as={RouterLink} to={`/products/${item.product}`} fontWeight="bold" fontSize="lg" color="teal.600">
                        {item.name}
                      </Link>
                    </Flex>
                    <Text fontWeight="medium">
                      {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>

        {/* Right Side - Order Summary */}
        <Box bg={cardBg} p="8" shadow="lg" rounded="lg" borderWidth="1px">
          <Heading fontSize="2xl" mb="6" textAlign="center">
            Order Summary
          </Heading>

          <VStack spacing="4" divider={<Divider />}>
            <Flex justify="space-between" w="full">
              <Text>Items</Text>
              <Text fontWeight="bold">₹{order.itemsPrice}</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text>Shipping</Text>
              <Text fontWeight="bold">₹{order.shippingPrice}</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text>Tax</Text>
              <Text fontWeight="bold">₹{order.taxPrice}</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text>Total</Text>
              <Text fontWeight="bold" fontSize="xl">₹{order.totalPrice}</Text>
            </Flex>
          </VStack>

          {/* PayPal Button */}
          {!order.isPaid && (
            <Box mt="8">
              {loadingPay ? (
                <Loader />
              ) : (
                <PayPalScriptProvider
                  options={{
                    "client-id": "Ade_MnCXzZUYnWLhn_nlQ_d5eLyuuvW3oPoml3KNcZO2FMFgeqywIOPT3HW3pywVo45_Hf_AEYDdHRkf",
                    components: "buttons",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => actions.order.create({
                      purchase_units: [{ amount: { value: order.totalPrice } }],
                    })}
                    onApprove={(data, actions) =>
                      actions.order.capture().then((details) => {
                        const paymentResult = {
                          id: details.id,
                          status: details.status,
                          update_time: details.update_time,
                          email_address: details.payer.email_address,
                        };
                        successPaymentHandler(paymentResult);
                      })
                    }
                  />
                </PayPalScriptProvider>
              )}
            </Box>
          )}

          {/* Deliver Button */}
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && !order.isDelivered && (
            <Button
              mt="6"
              w="full"
              colorScheme="teal"
              onClick={deliverHandler}
              size="lg"
            >
              Mark as Delivered
            </Button>
          )}
        </Box>
      </Grid>
    </Flex>
  );
};

export default OrderScreen;











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
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useParams } from "react-router-dom";

// import {
//   deliverOrder,
//   getOrderDetails,
//   payOrder,
// } from "../actions/orderActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import {
//   ORDER_DELIVER_RESET,
//   ORDER_PAY_RESET,
// } from "../constants/orderConstants";

// const OrderScreen = () => {
//   const dispatch = useDispatch();
//   const { id: orderId } = useParams();

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, loading, error } = orderDetails;

//   const orderPay = useSelector((state) => state.orderPay);
//   const { loading: loadingPay, success: successPay } = orderPay;

//   const orderDeliver = useSelector((state) => state.orderDeliver);
//   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     dispatch({ type: ORDER_PAY_RESET });
//     dispatch({ type: ORDER_DELIVER_RESET });
//     if (!order || successPay || successDeliver) {
//       dispatch({ type: ORDER_PAY_RESET });
//       dispatch({ type: ORDER_DELIVER_RESET });
//       dispatch(getOrderDetails(orderId));
//     }
//   }, [dispatch, orderId, order, successPay, successDeliver]);

//   if (!loading) {
//     order.itemsPrice = order.orderItems.reduce(
//       (acc, currVal) => acc + currVal.price * currVal.qty,
//       0
//     );
//   }

//   const successPaymentHandler = (paymentResult) => {
//     dispatch(payOrder(orderId, PaymentRequest));
//   };

//   const deliverHandler = () => {
//     dispatch(deliverOrder(order));
//   };

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message type="error">{error}</Message>
//   ) : (
//     <>
//       <Flex w="full" py="5" direction="column">
//         <Grid templateColumns="3fr 2fr" gap="20">
//           {/* Column 1 */}
//           <Flex direction="column">
//             {/* Shipping */}
//             <Box borderBottom="1px" py="6" borderColor="gray.300">
//               <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
//                 Shipping
//               </Heading>
//               <Text>
//                 Name: <strong>{order.user.name}</strong>
//               </Text>
//               <Text>
//                 Email:{" "}
//                 <strong>
//                   <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//                 </strong>
//               </Text>
//               <Text>
//                 <strong>Address: </strong>
//                 {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
//                 {order.shippingAddress.postalCode},{" "}
//                 {order.shippingAddress.country}
//               </Text>
//               <Text mt="4">
//                 {order.isDelivered ? (
//                   <Message type="success">
//                     Delivered on {order.deliveredAt}
//                   </Message>
//                 ) : (
//                   <Message type="warning">Not Delivered</Message>
//                 )}
//               </Text>
//             </Box>

//             {/* Payment Method */}
//             <Box borderBottom="1px" py="6" borderColor="gray.300">
//               <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
//                 Payment Method
//               </Heading>
//               <Text>
//                 <strong>Method: </strong>
//                 {order.paymentMethod.toUpperCase()}
//               </Text>
//               <Text mt="4">
//                 {order.isPaid ? (
//                   <Message type="success">
//                     Paid on {new Date(order.paidAt).toUTCString()}
//                   </Message>
//                 ) : (
//                   <Message type="warning">Not Paid</Message>
//                 )}
//               </Text>
//             </Box>

//             {/* Order Items */}
//             <Box borderBottom="1px" py="6" borderColor="gray.300">
//               <Heading as="h2" mb="3" fontSize="2xl" fontWeight="semibold">
//                 Order Items
//               </Heading>
//               <Box>
//                 {order.orderItems.length === 0 ? (
//                   <Message>No Order Info</Message>
//                 ) : (
//                   <Box py="2">
//                     {order.orderItems.map((item, idx) => (
//                       <Flex
//                         key={idx}
//                         alignItems="center"
//                         justifyContent="space-between"
//                       >
//                         <Flex py="2" alignItems="center">
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             w="12"
//                             h="12"
//                             objectFit="cover"
//                             mr="6"
//                           />
//                           <Link
//                             fontWeight="bold"
//                             fontSize="xl"
//                             as={RouterLink}
//                             to={`/products/${item.product}`}
//                           >
//                             {item.name}
//                           </Link>
//                         </Flex>

//                         <Text fontSize="lg" fontWeight="semibold">
//                           {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
//                         </Text>
//                       </Flex>
//                     ))}
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </Flex>

//           {/* Column 2 */}
//           <Flex
//             direction="column"
//             bgColor="white"
//             justifyContent="space-between"
//             py="8"
//             px="8"
//             shadow="md"
//             rounded="lg"
//             borderColor="gray.300"
//           >
//             <Box>
//               <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
//                 Order Summary
//               </Heading>

//               {/* Items Price */}
//               <Flex
//                 borderBottom="1px"
//                 py="2"
//                 borderColor="gray.200"
//                 alignitems="center"
//                 justifyContent="space-between"
//               >
//                 <Text fontSize="xl">Items</Text>
//                 <Text fontWeight="bold" fontSize="xl">
//                   ₹{order.itemsPrice}
//                 </Text>
//               </Flex>

//               {/* Shipping Price */}
//               <Flex
//                 borderBottom="1px"
//                 py="2"
//                 borderColor="gray.200"
//                 alignitems="center"
//                 justifyContent="space-between"
//               >
//                 <Text fontSize="xl">Shipping</Text>
//                 <Text fontWeight="bold" fontSize="xl">
//                   ₹{order.shippingPrice}
//                 </Text>
//               </Flex>

//               {/* Tax Price */}
//               <Flex
//                 borderBottom="1px"
//                 py="2"
//                 borderColor="gray.200"
//                 alignitems="center"
//                 justifyContent="space-between"
//               >
//                 <Text fontSize="xl">Tax</Text>
//                 <Text fontWeight="bold" fontSize="xl">
//                   ₹{order.taxPrice}
//                 </Text>
//               </Flex>

//               {/* Total Price */}
//               <Flex
//                 borderBottom="1px"
//                 py="2"
//                 borderColor="gray.200"
//                 alignitems="center"
//                 justifyContent="space-between"
//               >
//                 <Text fontSize="xl">Total</Text>
//                 <Text fontWeight="bold" fontSize="xl">
//                   ₹{order.totalPrice}
//                 </Text>
//               </Flex>
//             </Box>

//             {/* PAYMENT BUTTON */}
//             {!order.isPaid && (
//               <Box>
//                 {loadingPay ? (
//                   <Loader />
//                 ) : (
//                   <PayPalScriptProvider
//                     options={{
//                       "client-id":
//                         "Ade_MnCXzZUYnWLhn_nlQ_d5eLyuuvW3oPoml3KNcZO2FMFgeqywIOPT3HW3pywVo45_Hf_AEYDdHRkf",
//                       components: "buttons",
//                     }}
//                   >
//                     <PayPalButtons
//                       createOrder={(data, actions) => {
//                         return actions.order.create({
//                           purchase_units: [
//                             {
//                               amount: {
//                                 value: order.totalPrice,
//                               },
//                             },
//                           ],
//                         });
//                       }}
//                       onApprove={(data, actions) => {
//                         return actions.order.capture().then((details) => {
//                           console.log(details);
//                           const paymentResult = {
//                             id: details.id,
//                             status: details.status,
//                             update_time: details.update_time,
//                             email_address: details.payer.email_address,
//                           };
//                           successPaymentHandler(paymentResult);
//                         });
//                       }}
//                     />
//                   </PayPalScriptProvider>
//                 )}
//               </Box>
//             )}

//             {/* Order deliver button */}
//             {loadingDeliver && <Loader />}
//             {userInfo && userInfo.isAdmin && !order.isDelivered && (
//               <Button type="button" colorScheme="teal" onClick={deliverHandler}>
//                 Mark as delivered
//               </Button>
//             )}
//           </Flex>
//         </Grid>
//       </Flex>
//     </>
//   );
// };

// export default OrderScreen;
