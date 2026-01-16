import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import '../global.css';

import { AudioPlayer } from '@/components/AudioPlayer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { getBackgroundColor } from '@/utils/helpers';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { ScheherazadeNew_400Regular, ScheherazadeNew_700Bold } from '@expo-google-fonts/scheherazade-new';
import { Audio, InterruptionModeAndroid } from 'expo-av';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
        ScheherazadeNew_400Regular,
        ScheherazadeNew_700Bold,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            shouldDuckAndroid: true,
        });
    }, []);

    // Keep splash screen visible until fonts are loaded
    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <NativeWindThemeSync />
            <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
                <SafeAreaView style={{ flex: 1, backgroundColor: getBackgroundColor(theme) }} edges={[]}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen
                            name='index'
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='tabs'
                            options={{
                                headerShown: true,
                                title: 'Quran App',
                                headerStyle: {
                                    backgroundColor: theme === 'dark' ? '#004B40' : '#186351',
                                },
                                headerTintColor: '#fff',
                                headerRight: () => <ThemeSwitcher />,
                            }}
                        />

                        <Stack.Screen
                            name='surah/[id]'
                            options={{
                                headerShown: true,
                                contentStyle: { paddingTop: 0, marginTop: 0 },
                                headerStyle: {
                                    backgroundColor: theme === 'dark' ? '#004B40' : '#186351',
                                },
                                headerTintColor: '#fff',
                                headerTitleAlign: 'center',
                            }}
                        />
                    </Stack>
                </SafeAreaView>
                <AudioPlayer />
                <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            </NavigationThemeProvider>
        </>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AudioPlayerProvider>
                <RootLayoutNav />
            </AudioPlayerProvider>
        </ThemeProvider>
    );
}
