import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
    const { theme } = useTheme();
    const colors = Colors[theme];

    useEffect(() => {
        // Show splash screen for 3 seconds
        const timer = setTimeout(async () => {
            await SplashScreen.hideAsync();
            router.replace('/tabs/surah' as any);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <Image source={require('@/assets/images/get-started.png')} style={styles.image} resizeMode='contain' />
                <Text style={[styles.title, { color: colors.text }]}>Quran App</Text>
                <Text style={[styles.subtitle, { color: colors.icon }]}>Membaca Al-Quran dengan mudah</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
});
