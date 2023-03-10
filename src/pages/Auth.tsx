import { Text, Button, Input, Stack, Space } from '@mantine/core';
import { IconUser, IconLock, IconX } from '@tabler/icons';
import { useSetState } from '@mantine/hooks';
import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';

export const Auth = ({ setAuth }: { setAuth: any }) => {
	const [signIn, setSignIn] = useSetState({ username: '', password: '' });

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSignIn({ [event.target.name]: event.target.value });
	};

	const onEnter = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			onSignIn();
		}
	};

	const onSignIn = () => {
		if (isSignInVerified() === false) {
			showNotification({
				color: 'red',
				icon: <IconX />,
				title: 'Error',
				message: 'Username and Password are invalid!',
			});
		}
	};

	const isSignInVerified = () => {
		if (signIn.username === 'TraderAdmin' && signIn.password === 'Trader@123') {
			setAuth(true);
			return true;
		}
		return false;
	};

	useEffect(() => {
		isSignInVerified();
	}, [signIn]);

	return (
		<Stack align="center" mt={150}>
			<Text size="xl" weight={500}>
				Welcome to Trade App
			</Text>
			<div style={{ width: 300, marginTop: '10px' }}>
				<Input
					size="md"
					icon={<IconUser />}
					placeholder="Username"
					name="username"
					onChange={onChange}
					invalid={signIn.username === ''}
				/>
				<Space h="md" />
				<Input
					size="md"
					icon={<IconLock />}
					placeholder="Password"
					name="password"
					type="password"
					onChange={onChange}
					onKeyPress={onEnter}
					invalid={signIn.password === ''}
				/>
				<Space h="md" />
				<Button type="submit" size="md" fullWidth onClick={onSignIn}>
					SignIn
				</Button>
			</div>
		</Stack>
	);
};
