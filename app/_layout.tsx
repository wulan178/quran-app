import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import '../global.css';

import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
    anchor: '',
};

function NativeWindThemeSync() {
    const { theme } = useTheme();
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme(theme);
    }, [theme, setColorScheme]);

    return null;
}

function RootLayoutNav() {
    const { theme } = useTheme();

    return (
        <>
            <NativeWindThemeSync />
            <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
                <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
                    <Stack
                        screenOptions={{
                            headerRight: () => <ThemeSwitcher />,
                            headerTitle: 'Quran App',
                        }}
                    />
                </SafeAreaView>
                <StatusBar translucent style={theme === 'dark' ? 'light' : 'dark'} />
            </NavigationThemeProvider>
        </>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <RootLayoutNav />
        </ThemeProvider>
    );
}
