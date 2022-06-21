import React, { useState } from 'react'
import { default as _ReactPlayer } from 'react-player/youtube'
import type { ReactPlayerProps } from 'react-player/types/lib'
import { Music, Pause } from 'react-feather'
import IconButton from '@components/buttons/icon-button'
import { MUSIC_STATIONS } from '@utils/constants'

// fixes react-player typescript issue
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>

interface FooterProps {
	focusMode: boolean
	wordCount: number
}

export default function Footer(props: FooterProps) {
	const { focusMode, wordCount } = props
	const [isMusicPlaying, setIsMusicPlaying] = useState(false)

	return (
		<div
			className={`fixed bottom-0 left-0 flex h-12 w-full items-center justify-between px-6 `}
		>
			<div
				className={`flex items-center justify-start transition-all duration-200 hover:opacity-100 ${
					focusMode ? 'opacity-5' : 'opacity-100'
				}`}
			>
				<span className='text-sm text-gray-500'>{`${wordCount} words`}</span>
			</div>
			<div
				className={`flex items-center justify-start transition-all duration-200 hover:opacity-100 ${
					focusMode ? 'opacity-5' : 'opacity-100'
				}`}
			>
				{isMusicPlaying ? (
					<IconButton
						className='h-full w-auto'
						icon={<Pause width={16} height={16} />}
						onClick={() => setIsMusicPlaying(false)}
						padding='px-0 py-4'
						textColor='text-gray-500'
					/>
				) : (
					<IconButton
						className='h-full w-auto'
						icon={<Music width={16} height={16} />}
						onClick={() => setIsMusicPlaying(true)}
						padding='px-0 py-4'
						textColor='text-gray-500'
					/>
				)}
				<ReactPlayer
					playing={isMusicPlaying}
					url={MUSIC_STATIONS.LOFI_GIRL_FOCUS}
					width='0px'
					height='0px'
				/>
			</div>
		</div>
	)
}
