import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getSurahList } from '@/services/quranApi';
import { getBackgroundColor } from '@/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TriangleAlert } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native';

type Surah = {
    nomor: number;
    nama: string;
    nama_latin: string;
    jumlah_ayat: number;
    tempat_turun: string;
    arti: string;
    deskripsi: string;
    audio: string;
};

const imgBgSurah = require('@/assets/images/header-bg.png');

export default function SurahList() {
    const { theme } = useTheme();
    const colors = Colors[theme];
    const { currentAudioUrl, isPlaying, playAudio, togglePlayPause } = useAudioPlayerContext();
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getSurahList()
            .then((json) => {
                setSurahs(json);
                setLoading(false);
            })
            .catch(() => {
                setError('Gagal memuat data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size='large' color={colors.tint} />
                <Text style={{ color: colors.text, marginTop: 12 }}>Memuat...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className='flex-1 items-center justify-center'>
                <TriangleAlert size={24} color={colors.text} />
                <Text style={{ color: colors.text, marginTop: 12 }}>Someting went wrong</Text>
            </View>
        );
    }

    return (
        <View className='flex-1'>
            <FlatList
                data={surahs}
                keyExtractor={(item) => item.nomor.toString()}
                contentContainerStyle={{ backgroundColor: getBackgroundColor(theme), paddingVertical: 16 }}
                renderItem={({ item }) => {
                    const isCurrentAudio = currentAudioUrl === item.audio;
                    const handlePlayPause = (e: any) => {
                        e.stopPropagation();
                        if (isCurrentAudio) {
                            togglePlayPause();
                        } else if (item.audio) {
                            playAudio(item.audio, item.nama_latin, item.arti);
                        }
                    };

                    return (
                        <Pressable
                            className='mx-4 shadow-xl rounded-lg overflow-hidden my-1.5 relative h-20'
                            onPress={() => router.push(`/surah/${item.nomor}`)}
                        >
                            <ImageBackground source={imgBgSurah} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
                                <View className='flex flex-row items-center h-full justify-between px-4 gap-4'>
                                    <ThemedText fontFamily='poppins' darkColor='#fff' fontWeight='semiBold' lightColor='#fff' className='text-lg'>
                                        {item.nomor}
                                    </ThemedText>
                                    <View className='flex-1'>
                                        <ThemedText
                                            fontFamily='poppins'
                                            darkColor='#fff'
                                            lightColor='#fff'
                                            fontWeight='bold'
                                            className='text-lg font-bold'
                                        >
                                            {item.nama_latin}
                                        </ThemedText>

                                        <View className='flex flex-row items-center gap-2 mt-1'>
                                            <ThemedText fontFamily='poppins' darkColor='#fff' lightColor='#fff' className='text-sm text-gray-200'>
                                                {item.jumlah_ayat} Ayat
                                            </ThemedText>
                                        </View>
                                    </View>

                                    <View className='flex flex-row justify-between items-center text-right gap-2 h-full'>
                                        <ThemedText
                                            fontFamily='poppins'
                                            darkColor='#fff'
                                            lightColor='#fff'
                                            fontWeight='semiBold'
                                            className='text-2xl'
                                        >
                                            {item.nama}
                                        </ThemedText>

                                        {item.audio && (
                                            <TouchableOpacity onPress={handlePlayPause} className='ml-2'>
                                                <Ionicons name={isCurrentAudio && isPlaying ? 'pause' : 'play'} size={20} color='#fff' />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </ImageBackground>
                        </Pressable>
                    );
                }}
            />
        </View>
    );
}
