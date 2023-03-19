import { Text, Button, Stack, Space, TextInput, Group } from '@mantine/core';
import { IconUser, IconLock, IconX } from '@tabler/icons';
import { useWindowEvent } from '@mantine/hooks';
import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';

export const Auth = ({ setAuth }: { setAuth: any }) => {
	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},
		validateInputOnBlur: ['password', 'username'],
		validate: {
			username: (value) => (value ? null : 'Invalid username'),
			password: (value) => (value ? null : 'Invalid password'),
		},
	});

	useWindowEvent('keydown', (event) => {
		if (event.key === 'Enter') {
			form.onSubmit(onSignIn);
		}
	});

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
		if (
			form.values.username === 'TraderAdmin' &&
			form.values.password === 'Trader@1234'
		) {
			setAuth(true);
			return true;
		}
		return false;
	};

	useEffect(() => {
		isSignInVerified();
	}, [form.values]);

	return (
		<Stack align="center" mt={150}>
			<Text size="xl" weight={500}>
				Welcome to Trade App
			</Text>
			<form onSubmit={form.onSubmit(onSignIn)}>
				<TextInput
					icon={<IconUser />}
					placeholder="Username"
					{...form.getInputProps('username')}
				/>
				<Space h="md" />
				<TextInput
					type="password"
					icon={<IconLock />}
					placeholder="Password"
					{...form.getInputProps('password')}
				/>
				<Space h="md" />
				<Button type="submit" size="md" fullWidth>
					SignIn
				</Button>
			</form>
		</Stack>
	);
};
