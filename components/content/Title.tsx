import { chakra, Textarea } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export default function Title(props) {
	const { setTitle, title } = props;
	const titleTextareaRef = useRef(null);

	useEffect(() => {
		titleTextareaRef.current.style.height = '84px';
	}, []);

	useEffect(() => {
		titleTextareaRef.current.style.height = 'inherit';
		titleTextareaRef.current.style.height = `${titleTextareaRef.current.scrollHeight}px`;
	}, [title]);

	return (
		<chakra.div w='full'>
			<Textarea
				w='full'
				h={16}
				minH={16}
				fontSize='5xl'
				fontWeight='semibold'
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Title'
				ref={titleTextareaRef}
				resize='none'
				rows={1}
				value={title}
				variant='unstyled'
			/>
		</chakra.div>
	);
}
