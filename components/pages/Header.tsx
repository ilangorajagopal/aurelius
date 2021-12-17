import { Fragment, useEffect, useState } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import {
	chakra,
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Popover,
	PopoverContent,
	PopoverTrigger,
	SimpleGrid,
	Stack,
	Switch,
	Tag,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { User } from 'react-feather';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import Settings from '../Settings';

export default function Header(props) {
	const { authSession, user } = props;
	const {
		isOpen: isSettingsModalOpen,
		onOpen: onSettingsModalOpen,
		onClose: onSettingsModalClose,
	} = useDisclosure();
	const { colorMode, toggleColorMode: toggleMode } = useColorMode();
	const router = useRouter();

	async function logout() {
		await signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL });
	}

	const Section = (props) => {
		const ic = useColorModeValue('brand.600', 'brand.50');
		const hbg = useColorModeValue('gray.50', 'brand.400');
		const tcl = useColorModeValue('gray.900', 'gray.50');
		const dcl = useColorModeValue('gray.500', 'gray.50');
		return (
			<Link
				m={-3}
				p={3}
				display='flex'
				alignItems='start'
				rounded='lg'
				_hover={{ bg: hbg }}
			>
				<Icon
					flexShrink={0}
					h={6}
					w={6}
					color={ic}
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					aria-hidden='true'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
				>
					<path d={props.icon} />
				</Icon>
				<Box ml={4}>
					<chakra.p fontSize='sm' fontWeight='700' color={tcl}>
						{props.title}
					</chakra.p>
					<chakra.p mt={1} fontSize='sm' color={dcl}>
						{props.children}
					</chakra.p>
				</Box>
			</Link>
		);
	};

	const sections = [
		{
			title: 'Analytics',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
			description:
				'Get a better understanding of where your traffic is coming from.',
		},
		{
			title: 'Engagement',
			icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
			description:
				'Speak directly to your customers in a more meaningful way.',
		},
		{
			title: 'Security',
			icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
			description: 'Your customers&#039; data will be safe and secure',
		},
		{
			title: 'Integrations',
			icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
			description:
				'Connect with third-party tools that you&#039;re already using.',
		},
		{
			title: 'Automations',
			icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
			description:
				'Build strategic funnels that will drive your customers to convert',
		},
	];

	const Features = (props) => {
		const hbg = useColorModeValue('gray.50', 'brand.400');
		const hbgh = useColorModeValue('gray.100', 'brand.500');
		const tcl = useColorModeValue('gray.900', 'gray.50');
		return (
			<Fragment>
				<SimpleGrid
					columns={props.h ? { base: 1, md: 3, lg: 5 } : 1}
					pos='relative'
					gap={{ base: 6, sm: 8 }}
					px={5}
					py={6}
					p={{ sm: 8 }}
				>
					{sections.map(({ title, icon, description }, index) => (
						<Section key={index} title={title} icon={icon}>
							{description}
						</Section>
					))}
				</SimpleGrid>
				<Box
					px={{ base: 5, sm: 8 }}
					py={5}
					bg={hbg}
					display={{ sm: 'flex' }}
				>
					<Stack
						direction={{ base: 'row' }}
						spacing={{ base: 6, sm: 10 }}
					>
						<Box display='flow-root'>
							<Link
								m={-3}
								p={3}
								display='flex'
								alignItems='center'
								rounded='md'
								fontSize='md'
								color={tcl}
								_hover={{ bg: hbgh }}
							>
								<Icon
									flexShrink={0}
									h={6}
									w={6}
									color='gray.400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
								>
									<path d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
									<path d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
								</Icon>
								<chakra.span ml={3}>Watch Demo</chakra.span>
							</Link>
						</Box>

						<Box display='flow-root'>
							<Link
								m={-3}
								p={3}
								display='flex'
								alignItems='center'
								rounded='md'
								fontSize='md'
								color={tcl}
								_hover={{ bg: hbgh }}
							>
								<Icon
									flexShrink={0}
									h={6}
									w={6}
									color='gray.400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
								>
									<path d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
								</Icon>
								<chakra.span ml={3}>Contact Sales</chakra.span>
							</Link>
						</Box>
					</Stack>
				</Box>
			</Fragment>
		);
	};

	return (
		<Flex
			as='header'
			w='full'
			h={24}
			px={6}
			alignItems='center'
			justifyContent='space-between'
			overflowY='hidden'
		>
			<HStack
				w='full'
				h='full'
				justifyContent='space-between'
				spacing={4}
			>
				{/* Logo */}
				<Flex
					align='center'
					justifyContent='start'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.900', 'white')}
				>
					<NextLink href='/'>
						<chakra.a
							d='flex'
							alignItems='center'
							justifyContent='center'
							cursor='pointer'
						>
							{colorMode === 'dark' ? (
								<NextImage
									src='/images/logo_dark.png'
									width={108}
									height={60}
									alt='Aurelius Logo'
								/>
							) : (
								<NextImage
									src='/images/logo.png'
									width={108}
									height={60}
									alt='Aurelius Logo'
								/>
							)}
						</chakra.a>
					</NextLink>
					<Tag ml={4}>Beta</Tag>
				</Flex>

				{/* Links & Account */}
				<HStack
					h='full'
					align='center'
					justifyContent='end'
					color={useColorModeValue('gray.900', 'white')}
					spacing={8}
				>
					{/*<Popover>*/}
					{/*	<PopoverTrigger>*/}
					{/*		<Button*/}
					{/*			display="inline-flex"*/}
					{/*			alignItems="center"*/}
					{/*			bg='transparent'*/}
					{/*			_focus={{ boxShadow: "none" }}*/}
					{/*			rightIcon={<IoIosArrowDown />}*/}
					{/*		>*/}
					{/*			Features*/}
					{/*		</Button>*/}
					{/*	</PopoverTrigger>*/}
					{/*	<PopoverContent*/}
					{/*		w="100vw"*/}
					{/*		maxW="md"*/}
					{/*		_focus={{ boxShadow: "md" }}*/}
					{/*	>*/}
					{/*		<Features />*/}
					{/*	</PopoverContent>*/}
					{/*</Popover>*/}
					<NextLink href='#features'>
						<chakra.a
							d='flex'
							alignItems='center'
							justifyContent='center'
							cursor='pointer'
						>
							Features
						</chakra.a>
					</NextLink>
					<NextLink href='/pricing'>
						<chakra.a
							d='flex'
							alignItems='center'
							justifyContent='center'
							cursor='pointer'
						>
							Pricing
						</chakra.a>
					</NextLink>
					<NextLink href='/blog'>
						<chakra.a
							d='flex'
							alignItems='center'
							justifyContent='center'
							cursor='pointer'
						>
							Blog
						</chakra.a>
					</NextLink>
					{authSession ? (
						<Menu>
							<MenuButton
								as={Button}
								p={0}
								bg='transparent'
								_hover={{ bg: 'transparent' }}
								_active={{ bg: 'transparent' }}
								_focus={{ bg: 'transparent' }}
							>
								<Avatar
									icon={<User width={16} height={16} />}
									size='sm'
								/>
							</MenuButton>
							<MenuList p={0}>
								<MenuItem w='full' h={10}>
									<NextLink href='/dashboard'>
										<Button
											aria-label='Dashboard Tab'
											colorScheme={
												router?.pathname ===
												'/dashboard'
													? 'brand'
													: ''
											}
											size='sm'
											px={4}
											variant={
												router?.pathname ===
												'/dashboard'
													? 'solid'
													: 'ghost'
											}
										>
											<MdOutlineSpaceDashboard
												width={14}
												height={14}
											/>
											<Text fontSize='sm' ml={2}>
												Dashboard
											</Text>
										</Button>
									</NextLink>
								</MenuItem>
								<MenuItem d='none'>What&apos;s New</MenuItem>
								<MenuItem
									w='full'
									h={10}
									onClick={onSettingsModalOpen}
								>
									<Text fontSize='sm'>Settings</Text>
								</MenuItem>
								<MenuDivider m={0} />
								<MenuItem
									w='full'
									h={10}
									d='flex'
									alignItems='center'
									justifyContent='space-between'
								>
									<Text fontSize='sm'>Dark Mode</Text>
									<Switch
										defaultChecked={colorMode === 'dark'}
										onChange={toggleMode}
										size='sm'
									/>
								</MenuItem>
								<MenuDivider m={0} />
								<MenuItem w='full' h={10} onClick={logout}>
									<Text fontSize='sm'>Sign Out</Text>
								</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<Button
							aria-label='sign in'
							px={8}
							rounded='md'
							d='flex'
							align='center'
							justify='center'
							colorScheme='brand'
							onClick={() =>
								signIn(null, {
									callbackUrl: `${
										process.env.NODE_ENV === 'production'
											? 'https://aurelius.ink/dashboard'
											: 'http://localhost:3000/dashboard'
									}`,
								})
							}
						>
							Sign In
						</Button>
					)}
				</HStack>
			</HStack>
			<Modal
				isCentered={true}
				isOpen={isSettingsModalOpen}
				onClose={onSettingsModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody py={6}>
						<Settings user={user} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
}
