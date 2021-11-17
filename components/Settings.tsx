import { supabase } from '../lib/supabase';
import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	VStack,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Settings() {
	const user = supabase.auth.user();
	const [profile, setProfile] = useState(null);
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState(user?.email ?? '');
	const [dailyGoal, setDailyGoal] = useState(300);
	const [isSaving, setIsSaving] = useState(false);
	const toast = useToast();

	useEffect(() => {
		async function fetchProfile() {
			const user = supabase.auth.user();
			const { data, error } = await supabase
				.from('profiles')
				.select()
				.match({ user_id: user?.id })
				.single();

			if (data) {
				setProfile(data);
				setName(data?.name);
				setUsername(data?.username);
				setDailyGoal(data?.daily_word_count_goal);
			}
		}

		fetchProfile().then(() => {
			console.log('Profile fetched');
		});
	}, []);

	async function saveProfile() {
		setIsSaving(true);
		const update = {
			name,
			username,
			daily_word_count_goal: dailyGoal,
		};
		if (profile) {
			const { data } = await supabase
				.from('profiles')
				.update(update)
				.match({ user_id: user?.id });

			if (data && data.length > 0) {
				setProfile(data[0]);
				toast({
					duration: 2000,
					position: 'top',
					status: 'success',
					title: 'Profile saved',
				});
			}
		} else {
			const { data } = await supabase
				.from('profiles')
				.insert([{ ...update, user_id: user?.id }]);

			if (data && data.length > 0) {
				setProfile(data[0]);
				toast({
					duration: 2000,
					position: 'top',
					status: 'success',
					title: 'Profile saved',
				});
			}
		}
		setIsSaving(false);
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
				<FormControl d='none'>
					<FormLabel>Username</FormLabel>
					<Input
						name='username'
						type='text'
						w='full'
						h={12}
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
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
					w='full'
					colorScheme='brand'
					size='lg'
					onClick={saveProfile}
					isLoading={isSaving}
				>
					{isSaving ? 'Saving...' : 'Save'}
				</Button>
			</FormControl>
		</VStack>
	);
}
