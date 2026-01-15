import { useTheme } from '@/contexts/ThemeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export function ThemeSwitcher() {
    const { theme, setThemeMode } = useTheme();

    return (
        <View className='flex justify-between items-center flex-row'>
            <Pressable
                className={`rounded-full relative flex flex-row gap-2 border bg-gray-200 border-gray-300 w-16 h-9 overflow-hidden`}
                onPress={() => setThemeMode(theme === 'light' ? 'dark' : 'light')}
                style={styles.transition}
            >
                <View
                    className={`rounded-full absolute top-1/2 left-0 -translate-y-1/2  flex flex-row gap-2 items-center justify-center border !border-gray-300 p-2 ${theme === 'light' ? 'bg-white translate-x-0' : 'bg-black translate-x-7'}`}
                    style={styles.transition}
                >
                    <MaterialIcons name={theme === 'light' ? 'light-mode' : 'dark-mode'} size={14} color={theme === 'light' ? 'black' : 'white'} />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    transition: {
        transitionProperty: 'all',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in-out',
        transitionDelay: '0ms',
    },
});
