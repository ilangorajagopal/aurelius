import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	VStack,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { checkUsername, fetchUserProfile, saveUserProfile } from '../lib/utils';
import { useSession } from 'next-auth/react';
import { Check, X } from 'react-feather';

export default function Settings(props) {
	const { user: authenticatedUser } = props;
	const { data: authSession } = useSession();
	const [profile, setProfile] = useState(null);
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [dailyGoal, setDailyGoal] = useState(300);
	const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [usernameAvailabilityStatus, setUsernameAvailabilityStatus] =
		useState('');
	const toast = useToast();

	useEffect(() => {
		async function fetchProfile() {
			const { user } = await fetchUserProfile(authenticatedUser?.id);
			setProfile(user);
			setName(user?.name);
			setEmail(user?.email);
			setUsername(user?.username);
			setDailyGoal(user?.dailyGoal);
		}

		fetchProfile().then(() => console.log('Profile fetched...'));
	}, [authSession]);

	useEffect(() => {
		setIsCheckingAvailability(true);
		const timer = setTimeout(() => {
			checkUsernameAvailability().then(() =>
				console.log('Check finished')
			);
		}, 1500);

		return () => clearTimeout(timer);
	}, [username]);

	async function saveProfile() {
		setIsSaving(true);
		const update = {
			name,
			email,
			username,
			dailyGoal,
		};
		await saveUserProfile(profile, update);
		toast({
			duration: 2000,
			position: 'top',
			status: 'success',
			title: 'Profile saved',
		});
		setIsSaving(false);
	}

	async function checkUsernameAvailability() {
		const { available } = await checkUsername(username);
		if (available) {
			setUsernameAvailabilityStatus('available');
		} else {
			setUsernameAvailabilityStatus('not_available');
		}
		setIsCheckingAvailability(false);
	}

	let usernameAvailableAlert: JSX.Element;
	if (profile?.username !== username && isCheckingAvailability) {
		usernameAvailableAlert = (
			<Button
				h='full'
				isLoading={isCheckingAvailability}
				variant='ghost'
			/>
		);
	} else if (
		usernameAvailabilityStatus === 'available' &&
		profile?.username !== username &&
		!isCheckingAvailability
	) {
		usernameAvailableAlert = (
			<Button h='full' variant='ghost'>
				<Icon as={Check} color='green.200' />
			</Button>
		);
	} else if (
		usernameAvailabilityStatus === 'not_available' &&
		profile?.username !== username &&
		!isCheckingAvailability
	) {
		usernameAvailableAlert = (
			<Button h='full' variant='ghost'>
				<Icon as={X} color='red.200' />
			</Button>
		);
	} else {
		usernameAvailableAlert = null;
	}

	return (
		<VStack
			color={useColorModeValue('black', 'white')}
			alignItems='start'
			spacing={8}
		>
			<Heading as='h2' fontSize='2xl'>
				Profile Settings
			</Heading>
			<VStack w='full' spacing={4} mb={4}>
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input
						name='name'
						type='text'
						w='full'
						h={12}
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Username</FormLabel>
					<InputGroup>
						<Input
							name='username'
							type='text'
							w='full'
							h={12}
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
						<InputRightElement h='full'>
							{usernameAvailableAlert}
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<FormControl>
					<FormLabel>Email Address</FormLabel>
					<Input
						name='email'
						type='text'
						w='full'
						h={12}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Daily Word Count Goal</FormLabel>
					<Input
						name='dailyGoal'
						type='text'
						w='full'
						h={12}
						onChange={(e) =>
							setDailyGoal(parseInt(e.target.value, 10))
						}
						value={dailyGoal}
					/>
				</FormControl>
			</VStack>
			<FormControl>
				<Button
					aria-label='Save profile'
					w='full'
					colorScheme='brand'
					size='lg'
					onClick={saveProfile}
					isLoading={isSaving}
					disabled={usernameAvailabilityStatus === 'not_available'}
				>
					{isSaving ? 'Saving...' : 'Save'}
				</Button>
			</FormControl>
		</VStack>
	);
}
