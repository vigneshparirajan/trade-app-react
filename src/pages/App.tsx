import { AppShell } from '@mantine/core';
import { useEffect } from 'react';
import { Auth } from './Auth';
import { AsideBar } from '../sections/AsideBar';
import { ThemeProvider } from '../providers/Theme';
import { NavBar } from '../sections/NavBar';
import { AppHeader } from '../sections/Header';
import { AppFooter } from '../sections/Footer';
import { Trade } from './Trade';
import { useListState, useSetState } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { useSessionStorage } from '../hooks/sessionStorage';

export default function App() {
	const [isAuth, setAuth] = useSessionStorage('isAuth', false);
	const [sessions, setSessions] = useListState<ISession>([]);

	const [config, setConfig] = useSetState({
		tradeAmount: 0,
		totalAmount: 0,
		investAmount: 0,
		tradePercent: 0,
		investPercent: 0,
	});

	const [app, setApp] = useSetState({
		isSignedIn: false,
		isNotSignedIn: false,
	});

	useEffect(() => {
		setApp({
			isSignedIn: isAuth,
			isNotSignedIn: !isAuth,
		});
	}, [isAuth]);

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
							setAuth={setAuth}
						/>
					}
					footer={
						<AppFooter
							config={config}
							sessions={sessions}
							setSessions={setSessions}
							setConfig={setConfig}
						/>
					}
				>
					{app.isSignedIn && (
						<Trade
							config={config}
							setConfig={setConfig}
							sessions={sessions}
							setSessions={setSessions}
						/>
					)}
					{app.isNotSignedIn && <Auth setAuth={setAuth} />}
				</AppShell>
			</NotificationsProvider>
		</ThemeProvider>
	);
}
