import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react";
import { IoCaretForwardSharp } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex justifyContent="center" mb="8">
      <Breadcrumb separator={<IoCaretForwardSharp color="gray.500" />}>
        {/* Step 1 */}
        <BreadcrumbItem>
          {step1 ? (
            <BreadcrumbLink as={RouterLink} to="/login">
              Login
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.400">
              Login
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Step 2 */}
        <BreadcrumbItem>
          {step2 ? (
            <BreadcrumbLink as={RouterLink} to="/shipping">
              Shipping
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.400">
              Shipping
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Step 3 */}
        <BreadcrumbItem>
          {step3 ? (
            <BreadcrumbLink as={RouterLink} to="/payment">
              Payment
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.400">
              Payment
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Step 4 */}
        <BreadcrumbItem>
          {step4 ? (
            <BreadcrumbLink as={RouterLink} to="/placeorder">
              Place Order
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink _disabled color="gray.400">
              Place Order
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};

export default CheckoutSteps;
