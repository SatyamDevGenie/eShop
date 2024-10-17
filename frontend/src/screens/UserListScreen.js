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
	Text,
	Tooltip,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
	IoCheckmarkCircleSharp,
	IoCloseCircleSharp,
	IoPencilSharp,
	IoTrashBinSharp,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			navigate('/login');
		}
	}, [dispatch, navigate, userInfo, success]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};

	// Responsive table layout (table on desktop, stacked on mobile)
	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<>
			<Heading as='h1' fontSize={{ base: 'xl', md: '2xl' }} mb='6' color='gray.700'>
				User Management
			</Heading>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type='error'>{error}</Message>
			) : (
				<Box
					bgColor='white'
					rounded='lg'
					shadow='base'
					px={{ base: '4', md: '6' }}
					py={{ base: '4', md: '6' }}>
					{!isMobile ? (
						<Table variant='striped' colorScheme='gray' size='md'>
							<Thead>
								<Tr>
									<Th>ID</Th>
									<Th>NAME</Th>
									<Th>EMAIL</Th>
									<Th textAlign='center'>ADMIN</Th>
									<Th textAlign='center'>ACTIONS</Th>
								</Tr>
							</Thead>
							<Tbody>
								{users.map((user) => (
									<Tr key={user._id}>
										<Td>
											<Text fontSize='sm' color='gray.600'>
												{user._id}
											</Text>
										</Td>
										<Td>
											<Text fontWeight='medium' color='gray.700'>
												{user.name}
											</Text>
										</Td>
										<Td>
											<Text fontSize='sm' color='gray.600'>
												<a href={`mailto:${user.email}`}>{user.email}</a>
											</Text>
										</Td>
										<Td textAlign='center'>
											{user.isAdmin ? (
												<Tooltip label='Admin User' aria-label='Admin User'>
													<Icon
														as={IoCheckmarkCircleSharp}
														color='green.500'
														w={6}
														h={6}
													/>
												</Tooltip>
											) : (
												<Tooltip label='Not Admin' aria-label='Not Admin'>
													<Icon
														as={IoCloseCircleSharp}
														color='red.500'
														w={6}
														h={6}
													/>
												</Tooltip>
											)}
										</Td>
										<Td textAlign='center'>
											<Flex justifyContent='center' alignItems='center'>
												<Tooltip label='Edit User' aria-label='Edit User'>
													<Button
														as={RouterLink}
														to={`/admin/user/${user._id}/edit`}
														colorScheme='blue'
														size='sm'
														variant='solid'
														mr={3}>
														<Icon as={IoPencilSharp} />
													</Button>
												</Tooltip>
												<Tooltip label='Delete User' aria-label='Delete User'>
													<Button
														colorScheme='red'
														size='sm'
														onClick={() => deleteHandler(user._id)}>
														<Icon as={IoTrashBinSharp} />
													</Button>
												</Tooltip>
											</Flex>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					) : (
						// Stacked view for mobile
						<Stack spacing={4}>
							{users.map((user) => (
								<Box
									key={user._id}
									borderWidth='1px'
									borderRadius='lg'
									overflow='hidden'
									shadow='sm'
									p={4}>
									<Flex justifyContent='space-between' alignItems='center' mb={2}>
										<Text fontSize='sm' fontWeight='bold' color='gray.600'>
											ID: {user._id}
										</Text>
										<Flex>
											<Tooltip label='Edit User' aria-label='Edit User'>
												<Button
													as={RouterLink}
													to={`/admin/user/${user._id}/edit`}
													colorScheme='blue'
													size='sm'
													variant='solid'
													mr={3}>
													<Icon as={IoPencilSharp} />
												</Button>
											</Tooltip>
											<Tooltip label='Delete User' aria-label='Delete User'>
												<Button
													colorScheme='red'
													size='sm'
													onClick={() => deleteHandler(user._id)}>
													<Icon as={IoTrashBinSharp} />
												</Button>
											</Tooltip>
										</Flex>
									</Flex>
									<Text fontWeight='medium' color='gray.700'>
										Name: {user.name}
									</Text>
									<Text fontSize='sm' color='gray.600'>
										Email: <a href={`mailto:${user.email}`}>{user.email}</a>
									</Text>
									<Flex alignItems='center' mt={2}>
										{user.isAdmin ? (
											<Icon as={IoCheckmarkCircleSharp} color='green.500' w={5} h={5} />
										) : (
											<Icon as={IoCloseCircleSharp} color='red.500' w={5} h={5} />
										)}
										<Text ml={2} fontSize='sm'>
											{user.isAdmin ? 'Admin User' : 'Not Admin'}
										</Text>
									</Flex>
								</Box>
							))}
						</Stack>
					)}
				</Box>
			)}
		</>
	);
};

export default UserListScreen;




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
// import {
// 	IoCheckmarkCircleSharp,
// 	IoCloseCircleSharp,
// 	IoPencilSharp,
// 	IoTrashBinSharp,
// } from 'react-icons/io5';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { deleteUser, listUsers } from '../actions/userActions';
// import Loader from '../components/Loader';
// import Message from '../components/Message';

// const UserListScreen = () => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const userList = useSelector((state) => state.userList);
// 	const { loading, error, users } = userList;

// 	const userLogin = useSelector((state) => state.userLogin);
// 	const { userInfo } = userLogin;

// 	const userDelete = useSelector((state) => state.userDelete);
// 	const { success } = userDelete;

// 	useEffect(() => {
// 		if (userInfo && userInfo.isAdmin) {
// 			dispatch(listUsers());
// 		} else {
// 			navigate('/login');
// 		}
// 	}, [dispatch, navigate, userInfo, success]);

// 	const deleteHandler = (id) => {
// 		if (window.confirm('Are you sure?')) {
// 			dispatch(deleteUser(id));
// 		}
// 	};

// 	return (
// 		<>
// 			<Heading as='h1' fontSize='3xl' mb='5'>
// 				Users
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
// 								<Th>NAME</Th>
// 								<Th>EMAIL</Th>
// 								<Th>ADMIN</Th>
// 								<Th></Th>
// 							</Tr>
// 						</Thead>
// 						<Tbody>
// 							{users.map((user) => (
// 								<Tr key={user._id}>
// 									<Td>{user._id}</Td>
// 									<Td>{user.name}</Td>
// 									<Td>
// 										<a href={`mailto:${user.email}`}>{user.email}</a>
// 									</Td>
// 									<Td>
// 										{user.isAdmin ? (
// 											<Icon
// 												as={IoCheckmarkCircleSharp}
// 												color='green.600'
// 												w='8'
// 												h='8'
// 											/>
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
// 												to={`/admin/user/${user._id}/edit`}
// 												colorScheme='teal'>
// 												<Icon as={IoPencilSharp} color='white' size='sm' />
// 											</Button>
// 											<Button
// 												mr='4'
// 												colorScheme='red'
// 												onClick={() => deleteHandler(user._id)}>
// 												<Icon as={IoTrashBinSharp} color='white' size='sm' />
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

// export default UserListScreen;
