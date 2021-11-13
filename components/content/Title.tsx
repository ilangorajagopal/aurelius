import { chakra, Textarea } from '@chakra-ui/react';

export default function Title(props) {
	return (
		<chakra.div w='full'>
			<Textarea
				w='full'
				fontSize='5xl'
				fontWeight='semibold'
				placeholder='Title'
				resize='none'
				rows={1}
				variant='unstyled'
			/>
		</chakra.div>
	);
}
