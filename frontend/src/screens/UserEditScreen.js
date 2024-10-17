import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  VStack,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  // Responsive heading font sizes
  const headingFontSize = useBreakpointValue({ base: "2xl", md: "3xl" });

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link as={RouterLink} to="/admin/userlist" color="teal.500" mb={4}>
        Go Back
      </Link>

      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Box
            bg="white"
            rounded="lg"
            shadow="lg"
            px={8}
            py={10}
            w={{ base: "100%", md: "500px" }}
          >
            <Heading as="h1" mb="8" fontSize={headingFontSize} textAlign="center">
              Edit User
            </Heading>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message type="error">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message type="error">{error}</Message>
            ) : (
              <form onSubmit={submitHandler}>
                <VStack spacing={5}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormControl id="isAdmin">
                    <Checkbox
                      size="lg"
                      colorScheme="teal"
                      isChecked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    >
                      Is Admin?
                    </Checkbox>
                  </FormControl>

                  <Button
                    type="submit"
                    isLoading={loading}
                    colorScheme="teal"
                    width="full"
                  >
                    Update
                  </Button>
                </VStack>
              </form>
            )}
          </Box>
        </FormContainer>
      </Flex>
    </>
  );
};

export default UserEditScreen;







// import {
//   Button,
//   Checkbox,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Link,
//   Spacer,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

// import { getUserDetails, updateUser } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { USER_UPDATE_RESET } from "../constants/userConstants";

// const UserEditScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id: userId } = useParams();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const userDetails = useSelector((state) => state.userDetails);
//   const { loading, error, user } = userDetails;

//   const userUpdate = useSelector((state) => state.userUpdate);
//   const {
//     loading: loadingUpdate,
//     error: errorUpdate,
//     success: successUpdate,
//   } = userUpdate;

//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: USER_UPDATE_RESET });
//       navigate("/admin/userlist");
//     } else {
//       if (!user.name || !user._id !== userId) {
//         dispatch(getUserDetails(userId));
//       } else {
//         setName(user.name);
//         setEmail(user.email);
//         setIsAdmin(user.isAdmin);
//       }
//     }
//   }, [dispatch, userId, user, successUpdate, navigate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ _id: userId, name, email, isAdmin }));
//   };

//   return (
//     <>
//       <Link as={RouterLink} to="/admin/userlist">
//         Go Back
//       </Link>
//       <Flex w="full" alignItems="center" justifyContent="center" py="5">
//         <FormContainer>
//           <Heading as="h1" mb="8" fontSize="3xl">
//             Edit User
//           </Heading>

//           {loadingUpdate && <Loader />}
//           {errorUpdate && <Message type="error">{errorUpdate}</Message>}

//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <Message type="error">{error}</Message>
//           ) : (
//             <form onSubmit={submitHandler}>
//               <FormControl id="name" isRequired>
//                 <FormLabel>Name</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Enter full name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </FormControl>
//               <Spacer h="3" />

//               <FormControl id="email" isRequired>
//                 <FormLabel>Email Address</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Enter email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </FormControl>
//               <Spacer h="3" />

//               <FormControl id="isAdmin" isRequired>
//                 <FormLabel>Is Admin?</FormLabel>
//                 <Checkbox
//                   size="lg"
//                   colorScheme="teal"
//                   checked={isAdmin}
//                   onChange={(e) => setIsAdmin(e.target.checked)}
//                 >
//                   Is Admin?
//                 </Checkbox>
//               </FormControl>
//               <Spacer h="3" />

//               <Button
//                 type="submit"
//                 isLoading={loading}
//                 colorScheme="teal"
//                 mt="4"
//               >
//                 Update
//               </Button>
//             </form>
//           )}
//         </FormContainer>
//       </Flex>
//     </>
//   );
// };

// export default UserEditScreen;
