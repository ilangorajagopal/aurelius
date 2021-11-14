import { Flex, HStack, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { useTimer, useStopwatch } from 'react-timer-hook';
import { Pause, Play, Square } from 'react-feather';
import { useState } from 'react';

export default function Timer(props) {
	const [countdownExpired, setCountdownExpired] = useState(false);
	const {
		seconds: stSeconds,
		minutes: stMinutes,
		hours: stHours,
		start: stStart,
		pause: stPause,
		isRunning: isStRunning,
	} = useStopwatch({ autoStart: false });
	const { seconds, minutes, hours, isRunning, pause, resume } = useTimer({
		autoStart: true,
		expiryTimestamp: props.expiry,
		onExpire: () => {
			setCountdownExpired(true);
			stStart();
		},
	});

	function pad(n, z = 2) {
		return ('00' + n).slice(-z);
	}

	function stopTimers() {
		if (countdownExpired) {
			const target = props.target * 60;
			const extraTime = stSeconds + stMinutes * 60 + stHours * 60 * 60;
			const totalTime = target + extraTime;
			props.endTimedSession(totalTime);
		} else {
			const totalTime = seconds + minutes * 60 + hours * 60 * 60;
			props.endTimedSession(totalTime);
		}
	}

	return (
		<HStack spacing={2}>
			{isRunning || isStRunning ? (
				<Tooltip label='Pause Session'>
					<IconButton
						aria-label='pause session timer'
						bg='transparent'
						p={0}
						size='xs'
						icon={<Pause width={14} height={14} />}
						onClick={() => {
							if (isRunning) {
								pause();
							} else {
								stPause();
							}
							if (props.music) {
								props.setMusicPlaying.off();
							}
						}}
					/>
				</Tooltip>
			) : (
				<Tooltip label='Resume Session'>
					<IconButton
						aria-label='resume session timer'
						bg='transparent'
						p={0}
						size='xs'
						icon={<Play width={14} height={14} />}
						onClick={() => {
							if (isRunning) {
								resume();
							} else {
								stStart();
							}
							if (props.music) {
								props.setMusicPlaying.on();
							}
						}}
					/>
				</Tooltip>
			)}
			<Tooltip label='End Session'>
				<IconButton
					aria-label='stop session timer'
					bg='transparent'
					p={0}
					size='xs'
					icon={<Square width={14} height={14} />}
					onClick={stopTimers}
				/>
			</Tooltip>
			<Flex fontSize='sm' fontWeight='light'>
				<Text>{isRunning ? '' : '+ '}</Text>
				<Text>{isRunning ? pad(hours) : pad(stHours)}</Text> :{' '}
				<Text>{isRunning ? pad(minutes) : pad(stMinutes)}</Text> :{' '}
				<Text>{isRunning ? pad(seconds) : pad(stSeconds)}</Text>
			</Flex>
		</HStack>
	);
}
