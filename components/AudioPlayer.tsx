import { ThemedText } from '@/components/themed-text';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export function AudioPlayer() {
    const { currentAudioUrl, currentSurahName, currentSurahMeaning, isPlaying, isLoading, duration, position, togglePlayPause, stop } =
        useAudioPlayerContext();

    // Only show if there's an audio loaded (playing or paused)
    const isVisible = currentAudioUrl !== null;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(isVisible ? 0 : 100) }],
        opacity: withSpring(isVisible ? 1 : 0),
    }));

    const progress = duration > 0 ? (position / duration) * 100 : 0;

    if (!isVisible) {
        return null;
    }

    return (
        <SafeAreaView>
            <Animated.View style={[styles.container, animatedStyle]}>
                <View style={[styles.playerContainer, { backgroundColor: '#004B40' }]}>
                    {/* Progress bar di top */}
                    <View style={styles.topProgress}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>

                    <View style={styles.content}>
                        {/* Info */}
                        <View style={styles.info}>
                            <ThemedText fontFamily='poppins' fontWeight='bold' lightColor='#fff' darkColor='#fff' style={styles.surahName}>
                                {currentSurahName}
                            </ThemedText>
                            <ThemedText
                                fontFamily='poppins'
                                lightColor='rgba(255, 255, 255, 0.8)'
                                darkColor='rgba(255, 255, 255, 0.8)'
                                style={styles.surahMeaning}
                            >
                                {currentSurahMeaning}
                            </ThemedText>
                        </View>

                        {/* Controls */}
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={stop} style={styles.controlButton}>
                                <Ionicons name='close' size={24} color='#fff' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={togglePlayPause} disabled={isLoading} style={styles.mainButton}>
                                {isLoading ? (
                                    <ActivityIndicator size='small' color='#0a7ea4' />
                                ) : (
                                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color='#004B40' />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    playerContainer: {
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    topProgress: {
        height: 3,
        backgroundColor: '#fff',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#87D1A4',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    info: {
        flex: 1,
    },
    surahName: {
        fontSize: 16,
        marginBottom: 2,
    },
    surahMeaning: {
        fontSize: 13,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    controlButton: {
        padding: 8,
    },
    mainButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
});
