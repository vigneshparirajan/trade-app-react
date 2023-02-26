import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { Auth } from './Auth';
import { AsideBar } from '../sections/AsideBar';
import { ThemeProvider } from '../providers/Theme';
import { NavBar } from '../sections/NavBar';
import { AppHeader } from '../sections/Header';
import { AppFooter } from '../sections/Footer';
import { Trade } from './Trade';
import { useListState, useSetState, useSessionStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

export default function App() {
	const [isAuth, setAuth] = useState();
	const [sessions, setSessions] = useListState<ISession>([]);
	const [isSignedIn, setIsSignedIn] = useSessionStorage({
		key: 'isSignedIn',
		defaultValue: false,
	});

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
					hidden={!isAuth && !isSignedIn}
					navbarOffsetBreakpoint="sm"
					asideOffsetBreakpoint="sm"
					aside={<AsideBar hidden />}
					navbar={<NavBar hidden />}
					header={
						<AppHeader
							setIsSignedIn={setIsSignedIn}
							setSessions={setSessions}
							setConfig={setConfig}
							setAuth={setAuth}
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
					{isAuth || isSignedIn ? (
						<Trade
							config={config}
							setConfig={setConfig}
							sessions={sessions}
							setSessions={setSessions}
						/>
					) : (
						<Auth setAuth={setAuth} setIsSignedIn={setIsSignedIn} />
					)}
				</AppShell>
			</NotificationsProvider>
		</ThemeProvider>
	);
}
