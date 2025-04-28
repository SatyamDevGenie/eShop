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
	Divider,
	Badge,
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

	const { loading, error, users } = useSelector((state) => state.userList);
	const { userInfo } = useSelector((state) => state.userLogin);
	const { success: successDelete } = useSelector((state) => state.userDelete);

	const isMobile = useBreakpointValue({ base: true, md: false });

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			navigate('/login');
		}
	}, [dispatch, navigate, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<Heading
				as="h1"
				fontSize={{ base: '2xl', md: '3xl' }}
				fontWeight="bold"
				mb="6"
				color="gray.700"
			>
				User Management
			</Heading>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type="error">{error}</Message>
			) : (
				<Box
					bg="white"
					rounded="lg"
					shadow="md"
					p={{ base: '4', md: '6' }}
				>
					{!isMobile ? (
						<Table variant="simple" size="md">
							<Thead bg="gray.100">
								<Tr>
									<Th>ID</Th>
									<Th>NAME</Th>
									<Th>EMAIL</Th>
									<Th textAlign="center">ROLE</Th>
									<Th textAlign="center">ACTIONS</Th>
								</Tr>
							</Thead>
							<Tbody>
								{users.map((user) => (
									<Tr key={user._id}>
										<Td fontSize="sm" color="gray.600">
											{user._id}
										</Td>
										<Td fontWeight="medium" color="gray.700">
											{user.name}
										</Td>
										<Td fontSize="sm" color="gray.600">
											<a href={`mailto:${user.email}`}>{user.email}</a>
										</Td>
										<Td textAlign="center">
											<Badge
												variant="solid"
												colorScheme={user.isAdmin ? 'green' : 'red'}
												px={3}
												py={1}
												borderRadius="full"
											>
												{user.isAdmin ? 'Admin' : 'User'}
											</Badge>
										</Td>
										<Td textAlign="center">
											<Flex justify="center" gap={3}>
												<Tooltip label="Edit User">
													<Button
														as={RouterLink}
														to={`/admin/user/${user._id}/edit`}
														colorScheme="blue"
														size="sm"
														leftIcon={<Icon as={IoPencilSharp} />}
													>
														Edit
													</Button>
												</Tooltip>
												<Tooltip label="Delete User">
													<Button
														colorScheme="red"
														size="sm"
														leftIcon={<Icon as={IoTrashBinSharp} />}
														onClick={() => deleteHandler(user._id)}
													>
														Delete
													</Button>
												</Tooltip>
											</Flex>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					) : (
						// Mobile View
						<Stack spacing={4}>
							{users.map((user) => (
								<Box
									key={user._id}
									borderWidth="1px"
									rounded="md"
									shadow="sm"
									p={4}
									bg="gray.50"
								>
									<Flex justify="space-between" align="center" mb={2}>
										<Text fontSize="xs" color="gray.500">
											{user._id}
										</Text>
										<Flex gap={2}>
											<Tooltip label="Edit User">
												<Button
													as={RouterLink}
													to={`/admin/user/${user._id}/edit`}
													colorScheme="blue"
													size="sm"
													variant="outline"
													leftIcon={<Icon as={IoPencilSharp} />}
												/>
											</Tooltip>
											<Tooltip label="Delete User">
												<Button
													colorScheme="red"
													size="sm"
													variant="outline"
													leftIcon={<Icon as={IoTrashBinSharp} />}
													onClick={() => deleteHandler(user._id)}
												/>
											</Tooltip>
										</Flex>
									</Flex>

									<Divider mb={3} />

									<Stack spacing={1}>
										<Text fontWeight="bold" color="gray.700">
											{user.name}
										</Text>
										<Text fontSize="sm" color="gray.600">
											<a href={`mailto:${user.email}`}>{user.email}</a>
										</Text>
										<Badge
											mt={2}
											colorScheme={user.isAdmin ? 'green' : 'red'}
											alignSelf="start"
										>
											{user.isAdmin ? 'Admin' : 'User'}
										</Badge>
									</Stack>
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
