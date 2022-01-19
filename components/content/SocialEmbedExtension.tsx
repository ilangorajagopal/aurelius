import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import SocialEmbedComponent from './SocialEmbedComponent';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		socialEmbed: {
			setEmbedUrl: (options: { source: string }) => ReturnType;
		};
	}
}

export default Node.create({
	atom: true,
	name: 'socialEmbed',
	group: 'block',
	parseHTML() {
		return [{ tag: 'react-component' }];
	},
	renderHTML({ HTMLAttributes }) {
		return ['react-component', mergeAttributes(HTMLAttributes)];
	},
	addNodeView() {
		return ReactNodeViewRenderer(SocialEmbedComponent);
	},
	addCommands() {
		return {
			setEmbedUrl:
				(options) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options,
					});
				},
		};
	},
	addAttributes() {
		return {
			source: {
				default: '',
			},
		};
	},
});
