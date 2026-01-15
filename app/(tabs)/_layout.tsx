import { Tabs } from 'expo-router';
import { Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

export default function TabsLayout() {
    const { colorScheme, setColorScheme } = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerRight: () => (
                    <Pressable onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} className='mr-4'>
                        {colorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </Pressable>
                ),
            }}
        >
            <Tabs.Screen name='index' options={{ title: 'Home' }} />
        </Tabs>
    );
}
