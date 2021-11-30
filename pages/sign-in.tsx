import NextImage from 'next/image';
import {
	chakra,
	Button,
	Flex,
	FormErrorMessage,
	FormLabel,
	FormControl,
	Heading,
	Icon,
	Input,
	Text,
	VStack,
	useColorMode,
} from '@chakra-ui/react';
import {
	getCsrfToken,
	getProviders,
	getSession,
	signIn,
} from 'next-auth/react';
import { useForm } from 'react-hook-form';
import filter from 'lodash.filter';
import { FcGoogle } from 'react-icons/fc';
import Container from '../components/Container';

export default function SignIn({ csrfToken, providers }) {
	const { colorMode } = useColorMode();
	const {
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
	} = useForm();

	async function handleProviderSignIn(provider) {
		await signIn(provider.id);
	}

	async function onSubmit(values) {
		try {
			await signIn('email', { email: values.email });
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Container width='100vw' height='100vh' justifyContent='center'>
			<VStack w='full' maxW='container.sm' px={8} spacing={8}>
				<VStack
					w='full'
					alignItems='center'
					justifyContent='center'
					textAlign='center'
					spacing={8}
				>
					{colorMode === 'dark' ? (
						<NextImage
							src='/images/logo_dark.png'
							width={144}
							height={80}
						/>
					) : (
						<NextImage
							src='/images/logo.png'
							width={144}
							height={80}
						/>
					)}
					<VStack spacing={4}>
						<Heading as='h1' fontSize='2xl'>
							Sign In
						</Heading>
						<Text>
							Sign in with an existing account or create a new
							account.
						</Text>
					</VStack>
				</VStack>
				<VStack spacing={8}>
					<chakra.form w='sm' onSubmit={handleSubmit(onSubmit)}>
						<Input
							name='csrfToken'
							{...register('csrfToken')}
							type='hidden'
							defaultValue={csrfToken}
							hidden={true}
						/>
						<FormControl isInvalid={errors.name} mb={4}>
							<FormLabel htmlFor='email'>Email Address</FormLabel>
							<Input
								w='full'
								h={12}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required={true}
								{...register('email')}
							/>
							<FormErrorMessage>
								{errors.name && errors.name.message}
							</FormErrorMessage>
						</FormControl>
						<Button
							aria-label='sign in with email'
							colorScheme='brand'
							w='full'
							h={12}
							isLoading={isSubmitting}
							type='submit'
						>
							Sign In
						</Button>
					</chakra.form>
					<>
						<Flex
							w='sm'
							alignItems='center'
							_before={{
								position: 'relative',
								width: '50%',
								borderTop: '1px solid',
								borderTopColor: 'inherit',
								content: '""',
							}}
							_after={{
								position: 'relative',
								width: '50%',
								borderTop: '1px solid',
								borderTopColor: 'inherit',
								content: '""',
							}}
						>
							<Text fontSize='lg' mx={4}>
								or
							</Text>
						</Flex>
						{providers.map((provider, index) => {
							let icon = null;
							if (provider.id === 'google') {
								icon = FcGoogle;
							}

							return (
								<Button
									aria-label={`sign in with ${provider.name}`}
									key={index}
									w='full'
									h={12}
									onClick={() =>
										handleProviderSignIn(provider)
									}
								>
									<Icon as={icon} mr={2} />
									{provider.name}
								</Button>
							);
						})}
					</>
				</VStack>
			</VStack>
		</Container>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (session) {
		return { redirect: { permanent: false, destination: '/' } };
	}

	const csrfToken = await getCsrfToken({ req: context.req });
	const providers = filter(
		await getProviders(),
		(provider) => provider.type !== 'email'
	);

	return {
		props: { csrfToken, providers },
	};
}
