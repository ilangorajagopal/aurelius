import React, { useEffect, useRef, useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Input } from '@chakra-ui/react';
import Embed from 'react-embed';

export default function SocialEmbedComponent(props) {
	const {
		node: {
			attrs: { source },
		},
	} = props;
	const embedUrlFieldRef = useRef(null);
	const [embedUrl, setEmbedUrl] = useState('');
	const [isEmbedUrlValid, setIsEmbedUrlValid] = useState(false);

	useEffect(() => {
		embedUrlFieldRef?.current?.focus?.();
	}, [embedUrlFieldRef]);

	console.log(props);

	function onEmbedUrlSubmit(event) {
		if (event.keyCode === 13 && embedUrl !== '') {
			if (
				embedUrl.startsWith('https://') &&
				(embedUrl.includes('twitter.com') ||
					embedUrl.includes('youtube.com'))
			) {
				setIsEmbedUrlValid(true);
			}
		}
	}

	let placeholder: string;
	if (source === 'twitter') {
		placeholder = 'Enter Tweet URL';
	} else if (source === 'youtube') {
		placeholder = 'Enter Youtube Video URL';
	}

	return (
		<NodeViewWrapper>
			{embedUrl !== '' && isEmbedUrlValid ? (
				<Embed url={embedUrl} />
			) : (
				<Input
					w='full'
					h={12}
					autoFocus={true}
					onChange={(event) => setEmbedUrl(event.target.value)}
					onKeyDown={onEmbedUrlSubmit}
					placeholder={placeholder}
					ref={embedUrlFieldRef}
				/>
			)}

			<NodeViewContent />
		</NodeViewWrapper>
	);
}
