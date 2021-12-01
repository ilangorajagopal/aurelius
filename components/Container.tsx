import { Flex, useColorMode, FlexProps } from '@chakra-ui/react';

export default function Container(props: FlexProps) {
	const { colorMode } = useColorMode();
	const bgColor = { light: 'white', dark: 'gray.900' };
	const color = { light: 'black', dark: 'white' };

	return (
		<Flex
			direction='column'
			alignItems='center'
			justifyContent='flex-start'
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			{...props}
		/>
	);
}
