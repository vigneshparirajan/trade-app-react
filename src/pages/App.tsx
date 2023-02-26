import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { Auth } from './Auth';
import { AsideBar } from '../sections/AsideBar';
import { ThemeProvider } from '../providers/Theme';
import { NavBar } from '../sections/NavBar';
import { AppHeader } from '../sections/Header';
import { AppFooter } from '../sections/Footer';
import { Trade } from './Trade';
import {
	useListState,
	useSessionStorage,
	useSetState,
	useShallowEffect,
} from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

export default function App() {
	const [isAuth, setAuth] = useState(false);
	const [sessions, setSessions] = useListState<ISession>([]);
	const [isSignedIn, setIsSignIn] = useSessionStorage<boolean>({
		key: 'isSignedIn',
	});

	useShallowEffect(() => {
		if (isSignedIn) {
			setAppSignIn(true);
		}
	});

	const setAppSignIn = (isSigned: boolean) => {
		setAuth(isSigned);
		setIsSignIn(isSigned);
	};

	const [config, setConfig] = useSetState({
		tradeAmount: 0,
		totalAmount: 0,
		investAmount: 0,
		tradePercent: 0,
		investPercent: 0,
	});

	return (
		<ThemeProvider>
			<NotificationsProvider position="top-center">
				<AppShell
					layout="alt"
					hidden={!isAuth}
					navbarOffsetBreakpoint="sm"
					asideOffsetBreakpoint="sm"
					aside={<AsideBar hidden />}
					navbar={<NavBar hidden />}
					header={
						<AppHeader
							setSessions={setSessions}
							setConfig={setConfig}
							setAppSignIn={setAppSignIn}
						/>
					}
					footer={
						<AppFooter
							config={config}
							sessions={sessions}
							setSessions={setSessions}
						/>
					}
				>
					{isSignedIn !== undefined && !isSignedIn && (
						<Auth setAppSignIn={setAppSignIn} />
					)}
					{(isAuth || isSignedIn) && (
						<Trade
							config={config}
							setConfig={setConfig}
							sessions={sessions}
							setSessions={setSessions}
						/>
					)}
				</AppShell>
			</NotificationsProvider>
		</ThemeProvider>
	);
}
