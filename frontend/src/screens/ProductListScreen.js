import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Text,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoAdd, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverColor = useColorModeValue("gray.100", "gray.700");
  const tableHeaderColor = useColorModeValue("gray.200", "gray.700");

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Flex
        mb="5"
        alignItems={{ base: "flex-start", md: "center" }}
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}  // Added gap for better spacing on mobile
      >
        <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }}>
          Products
        </Heading>
        <Button
          onClick={createProductHandler}
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          leftIcon={<IoAdd />}
        >
          Create Product
        </Button>
      </Flex>

      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box
          bgColor={bgColor}
          rounded="lg"
          shadow="lg"
          px={{ base: 2, md: 5 }}
          py={{ base: 2, md: 5 }}
          mt="4"
          mx={{ base: 2, md: 5 }}
        >
          {!isMobile ? (
            // Desktop Table View
            <Box overflowX="auto">
              <Table variant="striped" size="sm">
                <Thead bgColor={tableHeaderColor}>
                  <Tr>
                    <Th>ID</Th>
                    <Th>NAME</Th>
                    <Th>PRICE</Th>
                    <Th>CATEGORY</Th>
                    <Th>BRAND</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
                    <Tr
                      key={product._id}
                      _hover={{
                        bg: hoverColor,
                      }}
                    >
                      <Td>{product._id}</Td>
                      <Td>{product.name}</Td>
                      <Td>₹{product.price.toFixed(2)}</Td>
                      <Td>{product.category}</Td>
                      <Td>{product.brand}</Td>
                      <Td>
                        <Flex
                          justifyContent={{ base: "space-between", md: "flex-end" }}
                          flexDirection={{ base: "column", md: "row" }} // Stack buttons on mobile
                          gap={2} // Add space between buttons
                        >
                          <Button
                            as={RouterLink}
                            to={`/admin/product/${product._id}/edit`}
                            colorScheme="teal"
                            size="sm"
                            variant="outline"
                            leftIcon={<IoPencilSharp />}
                            mb={{ base: 2, md: 0 }} // Margin bottom for mobile stacking
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => deleteHandler(product._id)}
                            leftIcon={<IoTrashBinSharp />}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            // Mobile Card View
            <Stack spacing={4}>
              {products.map((product) => (
                <Box
                  key={product._id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  shadow="sm"
                  p={4}
                  bgColor={bgColor}
                >
                  <Flex justifyContent="space-between" alignItems="center" mb={2}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.600">
                      ID: {product._id}
                    </Text>
                    <Flex
                      justifyContent="space-between"
                      flexDirection={{ base: "column", md: "row" }} // Stack buttons on mobile
                      gap={2} // Add gap between buttons for mobile
                    >
                      <Button
                        as={RouterLink}
                        to={`/admin/product/${product._id}/edit`}
                        colorScheme="teal"
                        size="sm"
                        variant="outline"
                        leftIcon={<IoPencilSharp />}
                        mb={{ base: 2, md: 0 }} // Adjust margin bottom for mobile stacking
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => deleteHandler(product._id)}
                        leftIcon={<IoTrashBinSharp />}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Flex>
                  <Text fontWeight="medium" color="gray.700">
                    {product.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Price: ₹{product.price.toFixed(2)}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Category: {product.category}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Brand: {product.brand}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductListScreen;













// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Icon,
//   Table,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { IoAdd, IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useNavigate } from "react-router-dom";

// import {
//   createProduct,
//   deleteProduct,
//   listProducts,
// } from "../actions/productActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

// const ProductListScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products } = productList;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const productDelete = useSelector((state) => state.productDelete);
//   const {
//     loading: loadingDelete,
//     error: errorDelete,
//     success: successDelete,
//   } = productDelete;

//   const productCreate = useSelector((state) => state.productCreate);
//   const {
//     loading: loadingCreate,
//     error: errorCreate,
//     success: successCreate,
//     product: createdProduct,
//   } = productCreate;

//   useEffect(() => {
//     dispatch({ type: PRODUCT_CREATE_RESET });

//     if (!userInfo || !userInfo.isAdmin) {
//       navigate("/login");
//     }

//     if (successCreate) {
//       navigate(`/admin/product/${createdProduct._id}/edit`);
//     } else {
//       dispatch(listProducts());
//     }
//   }, [
//     dispatch,
//     navigate,
//     userInfo,
//     successDelete,
//     successCreate,
//     createdProduct,
//   ]);

//   const deleteHandler = (id) => {
//     if (window.confirm("Are you sure")) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   const createProductHandler = () => {
//     dispatch(createProduct());
//   };

//   return (
//     <>
//       <Flex mb="5" alignItems="center" justifyContent="space-between">
//         <Heading as="h1" fontSize="3xl" mb="5">
//           Product
//         </Heading>
//         <Button onClick={createProductHandler} colorScheme="teal">
//           <Icon as={IoAdd} mr="2" fontSize="xl" fontWeight="bold" /> Create
//           Product
//         </Button>
//       </Flex>

//       {loadingDelete && <Loader />}
//       {errorDelete && <Message type="error">{errorDelete}</Message>}
//       {loadingCreate && <Loader />}
//       {errorCreate && <Message type="error">{errorCreate}</Message>}

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
//           <Table variant="striped" colorScheme="gray" size="sm">
//             <Thead>
//               <Tr>
//                 <Th>ID</Th>
//                 <Th>NAME</Th>
//                 <Th>PRICE</Th>
//                 <Th>CATEGORY</Th>
//                 <Th>BRAND</Th>
//                 <Th></Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {products.map((product) => (
//                 <Tr key={product._id}>
//                   <Td>{product._id}</Td>
//                   <Td>{product.name}</Td>
//                   <Td>{product.price}</Td>
//                   <Td>{product.category}</Td>
//                   <Td>{product.brand}</Td>
//                   <Td>
//                     <Flex justifyContent="flex-end" alignItems="center">
//                       <Button
//                         mr="4"
//                         as={RouterLink}
//                         to={`/admin/product/${product._id}/edit`}
//                         colorScheme="teal"
//                       >
//                         <Icon as={IoPencilSharp} color="white" size="sm" />
//                       </Button>
//                       <Button
//                         mr="4"
//                         colorScheme="red"
//                         onClick={() => deleteHandler(product._id)}
//                       >
//                         <Icon as={IoTrashBinSharp} color="white" size="sm" />
//                       </Button>
//                     </Flex>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </Box>
//       )}
//     </>
//   );
// };

// export default ProductListScreen;
