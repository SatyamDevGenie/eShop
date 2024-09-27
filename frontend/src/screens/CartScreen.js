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
    <Box>
      <Heading mb="8">Shopping Cart</Heading>
      <Flex>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <Grid
            templateColumns={{ sm: "1fr", md: "2fr 1fr", lg: "4fr 2fr" }}
            gap="10"
            w="full"
          >
            {/* Column 1 */}
            <Flex direction="column">
              {cartItems.map((item) => (
                <Grid
                  key={item.product}
                  size="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  py="4"
                  px="2"
                  rounded="lg"
                  _hover={{ bgColor: "blue.50" }}
                  bgColor="white"
                  templateColumns={{ sm: "1fr", xl: "1fr 4fr 2fr 2fr 2fr" }}
                >
                  {/* Product Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    borderRadius="lg"
                    height="14"
                    width="14"
                    objectFit="cover"
                  />
                  {/* Product Title */}
                  <Text fontWeight="semibold" fontSize="lg">
                    <Link as={RouterLink} to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Text>

                  {/* Product price */}
                  <Text fontWeight="semibold" fontSize="lg">
                    ₹{item.price}
                  </Text>

                  {/* Quantity Select Box */}
                  <Select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, +e.target.value))
                    }
                    width="40%"
                  >
                    {[...Array(item.countInStock).keys()].map((i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </Select>

                  {/* Delete Button */}
                  <Button
                    type="button"
                    colorSchema="red"
                    _hover={{ bgColor: "red.500" }}
                    bgColor="red.200"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <Icon as={IoTrashBinSharp} />
                  </Button>
                </Grid>
              ))}
            </Flex>

            {/* Column 2 */}
            <Flex direction="column" rounded="md" padding="5">
              <Heading as="h2" fontSize="2xl" mb="2">
                Subtotal(
                {cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)})
              </Heading>
              <Grid>
                <Text fontWeight="bold" fontSize="2xl" color="blue.600" mb="4">
                  Total Price : ₹{" "}
                  {cartItems.reduce(
                    (acc, currVal) => acc + currVal.price * currVal.qty,
                    0
                  )}
                </Text>
                <Button
                  type="button"
                  isDisabled={cartItems.length === 0}
                  size="lg"
                  colorScheme="teal"
                  bgColor="gray.800"
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </Grid>
            </Flex>
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default CartScreen;
