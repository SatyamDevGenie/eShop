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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
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
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
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
        <Button as={RouterLink} to="/" colorScheme="teal" variant="outline">
          Go Back
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid
            templateColumns={{ sm: "1fr", md: "2fr 1fr" }}
            gap="10"
            py="8"
            px="5"
            borderRadius="lg"
            boxShadow="md"
            bg="white"
          >
            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              borderRadius="md"
              objectFit="cover"
              boxShadow="sm"
            />

            {/* Product Details */}
            <Flex direction="column" justifyContent="space-between">
              <Box>
                <Heading as="h1" fontSize="3xl" mb="4" color="teal.600">
                  {product.name}
                </Heading>
                <Text fontSize="lg" color="gray.500" mb="4">
                  {product.brand}
                </Text>
                <Rating
                  value={product.rating}
                  color="yellow.500"
                  text={`${product.numReviews} reviews`}
                  mb="4"
                />
                <Text fontSize="xl" fontWeight="bold" color="teal.800">
                  ₹{product.price}
                </Text>
                <Text mt="4" color="gray.700">
                  {product.description}
                </Text>
              </Box>

              {/* Add to Cart Section */}
              <Box mt="8" p="6" bg="gray.50" borderRadius="lg" boxShadow="sm">
                <Flex justifyContent="space-between" mb="4">
                  <Text>Price:</Text>
                  <Text fontWeight="bold">₹{product.price}</Text>
                </Flex>
                <Flex justifyContent="space-between" mb="4">
                  <Text>Status:</Text>
                  <Text fontWeight="bold">
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Text>
                </Flex>
                {product.countInStock > 0 && (
                  <Flex justifyContent="space-between" mb="4">
                    <Text>Qty:</Text>
                    <Select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      width="30%"
                    >
                      {[...Array(product.countInStock).keys()].map((i) => (
                        <option value={i + 1} key={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                )}
                <Button
                  width="100%"
                  colorScheme="teal"
                  isDisabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </Box>
            </Flex>
          </Grid>

          {/* Review Section */}
          <Box mt="10" p="6" bg="white" borderRadius="lg" boxShadow="sm">
            <Heading as="h3" size="lg" mb="6">
              Write a Review
            </Heading>

            {product.reviews.length === 0 ? (
              <Message>No Reviews</Message>
            ) : (
              product.reviews.map((review) => (
                <Box
                  key={review._id}
                  p="4"
                  borderBottom="1px"
                  borderColor="gray.200"
                  mb="4"
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold">{review.name}</Text>
                    <Rating value={review.rating} />
                  </Flex>
                  <Text mt="2" color="gray.600">
                    {review.comment}
                  </Text>
                </Box>
              ))
            )}

            {errorProductReview && (
              <Message type="error">{errorProductReview}</Message>
            )}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <FormControl id="rating" mb="4">
                  <FormLabel>Rating</FormLabel>
                  <Select
                    placeholder="Select Option"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Okay</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Select>
                </FormControl>

                <FormControl id="comment" mb="4">
                  <FormLabel>Comment</FormLabel>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review here..."
                  />
                </FormControl>

                <Button type="submit" colorScheme="teal">
                  Submit Review
                </Button>
              </form>
            ) : (
              <Message>Please log in to write a review</Message>
            )}
          </Box>
        </>
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
//         <Button as={RouterLink} to="/" colorScheme="gray">
//           Go Back
//         </Button>
//       </Flex>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <>
//           <Grid templateColumns={{ sm: "1fr", md: "5fr 4fr 3fr" }} gap="10">
//             {/* Column 1 */}
//             <Image src={product.image} alt={product.name} borderRadius="md" />

//             {/* Column 2 */}
//             <Flex direction="column">
//               <Heading as="h5" fontSize="md" color="gray.500">
//                 {product.brand}
//               </Heading>

//               <Heading as="h2" fontSize="4xl" mb="4">
//                 {product.name}
//               </Heading>

//               <Rating
//                 value={product.rating}
//                 color="yellow.500"
//                 text={`${product.numReviews} reviews`}
//               />

//               <Heading
//                 as="h5"
//                 fontSize="4xl"
//                 fontWeight="bold"
//                 color="teal.600"
//                 my="5"
//               >
//                 ₹{product.price}
//               </Heading>

//               <Text>{product.description}</Text>
//             </Flex>

//             {/* Column 3 */}
//             <Flex direction="column">
//               <Flex justifyContent="space-between" py="2">
//                 <Text>Price: </Text>
//                 <Text fontWeight="bold">₹{product.price}</Text>
//               </Flex>

//               <Flex justifyContent="space-between" py="2">
//                 <Text>Status: </Text>
//                 <Text fontWeight="bold">
//                   {product.countInStock > 0 ? "In Stock" : "Not Available"}
//                 </Text>
//               </Flex>

//               {product.countInStock > 0 && (
//                 <Flex justifyContent="space-between" py="2">
//                   <Text>Qty: </Text>
//                   <Select
//                     value={qty}
//                     onChange={(e) => setQty(e.target.value)}
//                     width="30%"
//                   >
//                     {[...Array(product.countInStock).keys()].map((i) => (
//                       <option value={i + 1} key={i + 1}>
//                         {i + 1}
//                       </option>
//                     ))}
//                   </Select>
//                 </Flex>
//               )}

//               <Button
//                 bg="gray.800"
//                 colorScheme="teal"
//                 my="2"
//                 textTransform="uppercase"
//                 letterSpacing="wide"
//                 isDisabled={product.countInStock === 0}
//                 onClick={addToCartHandler}
//               >
//                 Add To Cart
//               </Button>
//             </Flex>
//           </Grid>

//           <Box
//             p="10"
//             bgColor="white"
//             rounded="md"
//             mt="10"
//             borderColor="gray.300"
//           >
//             <Heading as="h3" size="lg" mb="6">
//               Write a review
//             </Heading>

//             {product.reviews.length === 0 && <Message>No Reviews</Message>}

//             {product.reviews.length !== 0 && (
//               <Box p="4" bgColor="white" rounded="md" mb="1" mt="5">
//                 {product.reviews.map((review) => (
//                   <Flex direction="column" key={review._id} mb="5">
//                     <Flex justifyContent="space-between">
//                       <Text fontSize="lg">
//                         <strong>{review.name}</strong>
//                       </Text>
//                       <Rating value={review.rating} />
//                     </Flex>
//                     <Text mt="2">{review.comment}</Text>
//                   </Flex>
//                 ))}
//               </Box>
//             )}

//             {errorProductReview && (
//               <Message type="error">{errorProductReview}</Message>
//             )}

//             {userInfo ? (
//               <form onSubmit={submitHandler}>
//                 <FormControl id="rating" mb="3">
//                   <FormLabel>Rating</FormLabel>
//                   <Select
//                     placeholder="Select Option"
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                   >
//                     <option>Select...</option>
//                     <option value="1">1 - Poor</option>
//                     <option value="2">2 - Okay</option>
//                     <option value="3">3 - Good</option>
//                     <option value="4">4 - Very Good</option>
//                     <option value="5">5 - Excellent</option>
//                   </Select>
//                 </FormControl>

//                 <FormControl id="comment" mb="3">
//                   <FormLabel>Comment</FormLabel>
//                   <Textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                   ></Textarea>
//                 </FormControl>

//                 <Button colorScheme="teal" type="submit">
//                   Post Review
//                 </Button>
//               </form>
//             ) : (
//               <Message>Please login to write a review</Message>
//             )}
//           </Box>
//         </>
//       )}
//     </>
//   );
// };

// export default ProductScreen;
