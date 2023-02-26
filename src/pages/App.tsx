import { AppShell } from '@mantine/core';
import { useState } from 'react';
import { Auth } from './Auth';
import { AsideBar } from '../sections/AsideBar';
import { ThemeProvider } from '../providers/Theme';
import { NavBar } from '../sections/NavBar';
import { AppHeader } from '../sections/Header';
import { AppFooter } from '../sections/Footer';
import { Trade } from './Trade';
import { useListState, useSetState } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';

export default function App() {
	const [isAuth, setAuth] = useState();
	const [sessions, setSessions] = useListState<ISession>([]);

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
					{isAuth ? (
						<Trade
							config={config}
							setConfig={setConfig}
							sessions={sessions}
							setSessions={setSessions}
						/>
					) : (
						<Auth setAuth={setAuth} />
					)}
				</AppShell>
			</NotificationsProvider>
		</ThemeProvider>
	);
}
