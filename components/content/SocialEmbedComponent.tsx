import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Input } from '@chakra-ui/react';
import Embed from 'react-embed';

export default function SocialEmbedComponent(props) {
	const {
		node: {
			attrs: { source },
		},
	} = props;
	const [embedUrl, setEmbedUrl] = useState('');
	const [isEmbedUrlValid, setIsEmbedUrlValid] = useState(false);

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
					onChange={(event) => setEmbedUrl(event.target.value)}
					onKeyDown={onEmbedUrlSubmit}
					placeholder={placeholder}
				/>
			)}

			<NodeViewContent />
		</NodeViewWrapper>
	);
}
