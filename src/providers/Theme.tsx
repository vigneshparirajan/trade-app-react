import '@fontsource/nunito';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Nunito, sans-serif',
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      {children}
    </MantineProvider>
  );
}
