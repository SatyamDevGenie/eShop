import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Select,
  Text,
  Textarea,
  VStack,
  Divider,
  useColorModeValue,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { createProductReview, listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  const bg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted successfully!");
      setRating(1);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(listProductDetails(id));
  }, [id, dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Flex mb="5">
        <Button as={RouterLink} to="/" colorScheme="teal" variant="outline" size="sm">
          ← Back to Home
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "2fr 1fr" }}
          gap="10"
          py="8"
          px={{ base: "2", md: "8" }}
        >
          {/* Product Image */}
          <Flex align="center" justify="center" p="4">
            <Image
              src={product.image}
              alt={product.name}
              objectFit="contain"
              w="100%"
              maxH="500px"
              // _hover={{ transform: "scale(1.02)", transition: "all 0.3s ease-in-out" }}
            />
          </Flex>

          {/* Product Info */}
          <Flex direction="column" justify="space-between" bg={bg} p="6" rounded="lg" shadow="md">
            <VStack align="flex-start" spacing="4">
              <Heading fontSize="2xl" color="teal.600">
                {product.name}
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Brand: <strong>{product.brand}</strong>
              </Text>
              <Flex align="center">
                <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
              </Flex>
              <Divider />
              <Text fontSize="2xl" fontWeight="bold" color="teal.800">
                ₹{product.price}
              </Text>

              <Badge
                colorScheme={product.countInStock > 0 ? "green" : "red"}
                fontSize="md"
                p="1"
                borderRadius="md"
              >
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>

              <Text mt="4" color="gray.700" lineHeight="1.6">
                {product.description}
              </Text>
            </VStack>

            {/* Cart Interaction */}
            <Box mt="8">
              {product.countInStock > 0 && (
                <Flex align="center" mb="4">
                  <Text mr="4">Qty:</Text>
                  <Select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    maxW="100px"
                    borderColor="teal.500"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}
              <Button
                colorScheme="teal"
                width="full"
                onClick={addToCartHandler}
                isDisabled={product.countInStock === 0}
                size="lg"
                _hover={{ bg: "teal.600" }}
              >
                {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </Box>
          </Flex>
        </Grid>
      )}

      {/* Review Section */}
      {!loading && !error && (
        <Box mt="12" p={{ base: "4", md: "8" }} bg={bg} borderRadius="lg" boxShadow="md">
          <Heading as="h3" size="lg" mb="6" color="teal.700">
            Customer Reviews
          </Heading>

          {product.reviews.length === 0 ? (
            <Message>No Reviews Yet</Message>
          ) : (
            <Stack spacing="6">
              {product.reviews.map((review) => (
                <Box key={review._id} p="4" bg="gray.50" borderRadius="md" shadow="sm">
                  <Flex justify="space-between" align="center" mb="2">
                    <Text fontWeight="bold">{review.name}</Text>
                    <Rating value={review.rating} />
                  </Flex>
                  <Text color="gray.600">{review.comment}</Text>
                </Box>
              ))}
            </Stack>
          )}

          <Box mt="8">
            {errorProductReview && <Message type="error">{errorProductReview}</Message>}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <Stack spacing="4">
                  <FormControl id="rating">
                    <FormLabel>Rating</FormLabel>
                    <Select
                      placeholder="Select Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Select>
                  </FormControl>

                  <FormControl id="comment">
                    <FormLabel>Comment</FormLabel>
                    <Textarea
                      placeholder="Write your review..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>

                  <Button type="submit" colorScheme="teal">
                    Submit Review
                  </Button>
                </Stack>
              </form>
            ) : (
              <Message>Please <RouterLink to="/login">login</RouterLink> to write a review</Message>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductScreen;










// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Grid,
//   Heading,
//   Image,
//   Select,
//   Text,
//   Textarea,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

// import {
//   createProductReview,
//   listProductDetails,
// } from "../actions/productActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import Rating from "../components/Rating";
// import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

// const ProductScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [qty, setQty] = useState(1);
//   const [rating, setRating] = useState(1);
//   const [comment, setComment] = useState("");

//   const productDetails = useSelector((state) => state.productDetails);
//   const { loading, error, product } = productDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const productReviewCreate = useSelector((state) => state.productReviewCreate);
//   const { success: successProductReview, error: errorProductReview } =
//     productReviewCreate;

//   useEffect(() => {
//     if (successProductReview) {
//       alert("Review submitted");
//       setRating(1);
//       setComment("");
//       dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
//     }
//     dispatch(listProductDetails(id));
//   }, [id, dispatch, successProductReview]);

//   const addToCartHandler = () => {
//     navigate(`/cart/${id}?qty=${qty}`);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(createProductReview(id, { rating, comment }));
//   };

//   return (
//     <>
//       <Flex mb="5">
//         <Button as={RouterLink} to="/" colorScheme="teal" variant="outline">
//           Go Back
//         </Button>
//       </Flex>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <>
//           <Grid
//             templateColumns={{ sm: "1fr", md: "2fr 1fr" }}
//             gap="10"
//             py="8"
//             px="5"
//             borderRadius="lg"
//             boxShadow="md"
//             bg="white"
//           >
//             {/* Product Image */}
//             <Image
//               src={product.image}
//               alt={product.name}
//               borderRadius="md"
//               objectFit="cover"
//               boxShadow="sm"
//             />

//             {/* Product Details */}
//             <Flex direction="column" justifyContent="space-between">
//               <Box>
//                 <Heading as="h1" fontSize="3xl" mb="4" color="teal.600">
//                   {product.name}
//                 </Heading>
//                 <Text fontSize="lg" color="gray.500" mb="4">
//                   {product.brand}
//                 </Text>
//                 <Rating
//                   value={product.rating}
//                   color="yellow.500"
//                   text={`${product.numReviews} reviews`}
//                   mb="4"
//                 />
//                 <Text fontSize="xl" fontWeight="bold" color="teal.800">
//                   ₹{product.price}
//                 </Text>
//                 <Text mt="4" color="gray.700">
//                   {product.description}
//                 </Text>
//               </Box>

//               {/* Add to Cart Section */}
//               <Box mt="8" p="6" bg="gray.50" borderRadius="lg" boxShadow="sm">
//                 <Flex justifyContent="space-between" mb="4">
//                   <Text>Price:</Text>
//                   <Text fontWeight="bold">₹{product.price}</Text>
//                 </Flex>
//                 <Flex justifyContent="space-between" mb="4">
//                   <Text>Status:</Text>
//                   <Text fontWeight="bold">
//                     {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
//                   </Text>
//                 </Flex>
//                 {product.countInStock > 0 && (
//                   <Flex justifyContent="space-between" mb="4">
//                     <Text>Qty:</Text>
//                     <Select
//                       value={qty}
//                       onChange={(e) => setQty(e.target.value)}
//                       width="30%"
//                     >
//                       {[...Array(product.countInStock).keys()].map((i) => (
//                         <option value={i + 1} key={i + 1}>
//                           {i + 1}
//                         </option>
//                       ))}
//                     </Select>
//                   </Flex>
//                 )}
//                 <Button
//                   width="100%"
//                   colorScheme="teal"
//                   isDisabled={product.countInStock === 0}
//                   onClick={addToCartHandler}
//                 >
//                   Add to Cart
//                 </Button>
//               </Box>
//             </Flex>
//           </Grid>

//           {/* Review Section */}
//           <Box mt="10" p="6" bg="white" borderRadius="lg" boxShadow="sm">
//             <Heading as="h3" size="lg" mb="6">
//               Write a Review
//             </Heading>

//             {product.reviews.length === 0 ? (
//               <Message>No Reviews</Message>
//             ) : (
//               product.reviews.map((review) => (
//                 <Box
//                   key={review._id}
//                   p="4"
//                   borderBottom="1px"
//                   borderColor="gray.200"
//                   mb="4"
//                 >
//                   <Flex justifyContent="space-between" alignItems="center">
//                     <Text fontWeight="bold">{review.name}</Text>
//                     <Rating value={review.rating} />
//                   </Flex>
//                   <Text mt="2" color="gray.600">
//                     {review.comment}
//                   </Text>
//                 </Box>
//               ))
//             )}

//             {errorProductReview && (
//               <Message type="error">{errorProductReview}</Message>
//             )}

//             {userInfo ? (
//               <form onSubmit={submitHandler}>
//                 <FormControl id="rating" mb="4">
//                   <FormLabel>Rating</FormLabel>
//                   <Select
//                     placeholder="Select Option"
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                   >
//                     <option value="1">1 - Poor</option>
//                     <option value="2">2 - Okay</option>
//                     <option value="3">3 - Good</option>
//                     <option value="4">4 - Very Good</option>
//                     <option value="5">5 - Excellent</option>
//                   </Select>
//                 </FormControl>

//                 <FormControl id="comment" mb="4">
//                   <FormLabel>Comment</FormLabel>
//                   <Textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     placeholder="Write your review here..."
//                   />
//                 </FormControl>

//                 <Button type="submit" colorScheme="teal">
//                   Submit Review
//                 </Button>
//               </form>
//             ) : (
//               <Message>Please log in to write a review</Message>
//             )}
//           </Box>
//         </>
//       )}
//     </>
//   );
// };

// export default ProductScreen;




