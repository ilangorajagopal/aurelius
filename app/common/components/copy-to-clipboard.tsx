import type { FC } from 'react'
import copy from 'copy-to-clipboard'
import { CopyIcon } from '@radix-ui/react-icons'
import { Button } from '@components/buttons'
import Tooltip from '@components/tooltip'

interface Props {
	text: string
}

const CopyToClipboard: FC<Props> = ({ text }) => {
	return (
		<Tooltip
			content='Copy to clipboard'
			trigger={
				<Button
					bg='bg-transparent'
					padding='p-1'
					onClick={() =>
						copy(text, {
							format: 'text/plain',
						})
					}
					type='button'
				>
					<CopyIcon />
				</Button>
			}
		/>
	)
}

export default CopyToClipboard
