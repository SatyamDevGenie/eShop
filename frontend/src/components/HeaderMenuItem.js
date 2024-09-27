import { Icon, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
const HeaderMenuItem = ({ label, url, icon }) => {
  return (
    <Link
      as={RouterLink}
      to={url}
      fontSize="sm"
      letterSpacing="wide"
      textTransform="uppercase"
      fontWeight="bold"
      fontFamily="Arial Black"
      mr="5"
      display="flex"
      alignItems="center"
      color="whiteAlpha.700"
      hover={{ textDecor: "none" }}
    >
      <Icon as={icon} mr="1" w="4" h="4" />
      {label}
    </Link>
  );
};

export default HeaderMenuItem;
