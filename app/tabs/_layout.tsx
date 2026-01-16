import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Tabs } from 'expo-router';
import { BookMarked, BookOpen } from 'lucide-react-native';

export default function TabsLayout() {
    const { theme } = useTheme();
    const colors = Colors[theme];

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.tint,
                tabBarInactiveTintColor: colors.icon,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.icon + '30',
                },
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
            }}
        >
            <Tabs.Screen
                name='surah/index'
                options={{
                    title: 'Surah',
                    tabBarLabel: 'Surah',
                    tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
                }}
            />
            {/* <Tabs.Screen
                name='juz'
                options={{
                    title: 'Juz',
                    tabBarLabel: 'Juz',
                    tabBarIcon: ({ color, size }) => <BookMarked color={color} size={size} />,
                }}
            /> */}
        </Tabs>
    );
}
