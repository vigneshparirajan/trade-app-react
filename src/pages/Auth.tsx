import {
  Button,
  Stack,
  Space,
  TextInput,
  Title,
  Container,
  PasswordInput,
} from '@mantine/core';
import { IconUser, IconLock, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { useWindowEvent } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useSignIn } from '../services/userService';

export const Auth = ({ setAuth }: { setAuth: any }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const form = useForm({
    initialValues,
    validateInputOnBlur: ['username', 'password'],
    validate: {
      username: (value) => (value ? null : 'Please enter username!'),
      password: (value) => (value ? null : 'Please enter password!'),
    },
  });

  const login = useSignIn();

  const onSignIn = async () => {
    const user = await login.mutateAsync({
      email: form.values.username,
      password: form.values.password,
    });
    console.log(user.token);
    return user.token !== undefined;
  };

  useWindowEvent('keydown', (event) => {
    return event.key === 'Enter' ? form.onSubmit(onSubmitSignIn) : null;
  });

  const onSubmitSignIn = async () => {
    if ((await onSignIn()) === false) {
      return showNotification({
        color: 'red',
        icon: <IconX />,
        title: 'Error',
        message: 'Username and Password are invalid!',
      });
    }
    return setAuth(true);
  };

  return (
    <Container size={300} px={0} mt={150}>
      <Stack align="stretch">
        <Title order={2} align="center">
          Welcome to Trade App
        </Title>
        <form onSubmit={form.onSubmit(onSubmitSignIn)}>
          <TextInput
            icon={<IconUser />}
            placeholder="Username"
            {...form.getInputProps('username')}
          />
          <Space h="md" />
          <PasswordInput
            icon={<IconLock />}
            placeholder="Password"
            {...form.getInputProps('password')}
          />
          <Space h="md" />
          <Button size="md" fullWidth type="submit" loading={login.isLoading}>
            Sign-In
          </Button>
        </form>
      </Stack>
    </Container>
  );
};
