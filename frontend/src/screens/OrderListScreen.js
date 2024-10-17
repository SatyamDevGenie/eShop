import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { HiOutlineClipboardList } from 'react-icons/hi';

const OrderListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const bgColor = useColorModeValue('white', 'gray.800');
	const hoverColor = useColorModeValue('gray.100', 'gray.700');

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			navigate('/login');
		}
	}, [dispatch, userInfo, navigate]);

	return (
		<>
			<Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }} mb='5' textAlign='center'>
				<HiOutlineClipboardList size={30} /> Orders
			</Heading>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type='error'>{error}</Message>
			) : (
				<Box
					bgColor={bgColor}
					rounded='lg'
					shadow='lg'
					px={{ base: '4', md: '5' }}
					py={{ base: '4', md: '5' }}
					mx={{ base: '2', md: '10' }}
					mt='5'
				>
					{/* Responsive SimpleGrid with more columns on larger screens */}
					<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
						{orders.map((order) => (
							<Box
								key={order._id}
								borderWidth='1px'
								borderRadius='md'
								shadow='md'
								p={{ base: '3', md: '4' }} // Responsive padding
								bgColor={bgColor}
								_hover={{ bg: hoverColor }}
							>
								<Flex justifyContent='space-between' alignItems='center'>
									<Text fontWeight='bold' fontSize={{ base: 'sm', md: 'md' }}>Order ID: {order._id}</Text>
									<Button
										as={RouterLink}
										to={`/order/${order._id}`}
										colorScheme='teal'
										variant='outline'
										size={{ base: 'sm', md: 'md' }} // Responsive button size
									>
										Details
									</Button>
								</Flex>
								<Text fontSize={{ base: 'sm', md: 'md' }}>User: {order.user && order.user.name}</Text>
								<Text fontSize={{ base: 'sm', md: 'md' }}>Date: {order.createdAt.substring(0, 10)}</Text>
								<Text fontSize={{ base: 'sm', md: 'md' }}>Total Price: ₹{order.totalPrice}</Text>
								<Text fontSize={{ base: 'sm', md: 'md' }}>
									Paid: {order.isPaid ? order.paidAt.substring(0, 10) : <Icon as={IoCloseCircleSharp} color='red.600' />}
								</Text>
								<Text fontSize={{ base: 'sm', md: 'md' }}>
									Delivered: {order.isDelivered ? order.deliveredAt.substring(0, 10) : <Icon as={IoCloseCircleSharp} color='red.600' />}
								</Text>
							</Box>
						))}
					</SimpleGrid>
				</Box>
			)}
		</>
	);
};

export default OrderListScreen;







// import {
// 	Box,
// 	Button,
// 	Flex,
// 	Heading,
// 	Icon,
// 	Table,
// 	Tbody,
// 	Td,
// 	Th,
// 	Thead,
// 	Tr,
// } from '@chakra-ui/react';
// import { useEffect } from 'react';
// import { IoCloseCircleSharp } from 'react-icons/io5';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { listOrders } from '../actions/orderActions';
// import Loader from '../components/Loader';
// import Message from '../components/Message';

// const OrderListScreen = () => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const orderList = useSelector((state) => state.orderList);
// 	const { loading, error, orders } = orderList;

// 	const userLogin = useSelector((state) => state.userLogin);
// 	const { userInfo } = userLogin;

// 	console.log(orders);

// 	useEffect(() => {
// 		if (userInfo && userInfo.isAdmin) {
// 			dispatch(listOrders());
// 		} else {
// 			navigate('/login');
// 		}
// 	}, [dispatch, userInfo, navigate]);

// 	return (
// 		<>
// 			<Heading as='h1' fontSize='3xl' mb='5'>
// 				Orders
// 			</Heading>

// 			{loading ? (
// 				<Loader />
// 			) : error ? (
// 				<Message type='error'>{error}</Message>
// 			) : (
// 				<Box bgColor='white' rounded='lg' shadow='lg' px='5' py='5'>
// 					<Table variant='striped' colorScheme='gray' size='sm'>
// 						<Thead>
// 							<Tr>
// 								<Th>ID</Th>
// 								<Th>USER</Th>
// 								<Th>DATE</Th>
// 								<Th>TOTAL PRICE</Th>
// 								<Th>PAID</Th>
// 								<Th>DELIVERED</Th>
// 								<Th></Th>
// 							</Tr>
// 						</Thead>
// 						<Tbody>
// 							{orders.map((order) => (
// 								<Tr key={order._id}>
// 									<Td>{order._id}</Td>
// 									<Td>{order.user && order.user.name}</Td>
// 									<Td>{order.createdAt.substring(0, 10)}</Td>
// 									<Td>₹{order.totalPrice}</Td>
// 									<Td>
// 										{order.isPaid ? (
// 											order.paidAt.substring(0, 10)
// 										) : (
// 											<Icon
// 												as={IoCloseCircleSharp}
// 												color='red.600'
// 												w='8'
// 												h='8'
// 											/>
// 										)}
// 									</Td>
// 									<Td>
// 										{order.isDelivered ? (
// 											order.deliveredAt.substring(0, 10)
// 										) : (
// 											<Icon
// 												as={IoCloseCircleSharp}
// 												color='red.600'
// 												w='8'
// 												h='8'
// 											/>
// 										)}
// 									</Td>
// 									<Td>
// 										<Flex justifyContent='flex-end' alignItems='center'>
// 											<Button
// 												mr='4'
// 												as={RouterLink}
// 												to={`/order/${order._id}`}
// 												colorScheme='teal'>
// 												Details
// 											</Button>
// 										</Flex>
// 									</Td>
// 								</Tr>
// 							))}
// 						</Tbody>
// 					</Table>
// 				</Box>
// 			)}
// 		</>
// 	);
// };

// export default OrderListScreen;
