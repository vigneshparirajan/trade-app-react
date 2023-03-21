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
		validateInputOnBlur: ['username', 'password'],
		validate: {
			username: (value) => (value ? null : 'Please enter username!'),
			password: (value) => (value ? null : 'Please enter password!'),
		},
	});

	useWindowEvent('keydown', (event) => {
		return event.key === 'Enter' ? form.onSubmit(onSubmitSignIn) : null;
	});

	const onSubmitSignIn = () => {
		if (onVerifySignIn() === false) {
			showNotification({
				color: 'red',
				icon: <IconX />,
				title: 'Error',
				message: 'Username and Password are invalid!',
			});
		}
	};

	const onVerifySignIn = () => {
		if (
			form.values.username === 'TraderAdmin' &&
			form.values.password === 'Trader@123'
		) {
			setAuth(true);
			return true;
		}
		return false;
	};

	useEffect(() => {
		onVerifySignIn();
	}, [form.values]);

	return (
		<Stack align="center" mt={150}>
			<Text size="xl" weight={500}>
				Welcome to Trade App
			</Text>
			<form onSubmit={form.onSubmit(onSubmitSignIn)}>
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
