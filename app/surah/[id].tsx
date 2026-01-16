import { ThemedText } from '@/components/themed-text';
import { imgBgSurah } from '@/constants/assets';
import { Colors } from '@/constants/theme';
import { useAudioPlayerContext } from '@/contexts/AudioPlayerContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getSurahDetail } from '@/services/quranApi';
import { getBackgroundColor } from '@/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSearchParams } from 'expo-router/build/hooks';
import { TriangleAlert } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Ayat = {
    id: number;
    surah: number;
    nomor: number;
    ar: string;
    tr: string;
    idn: string;
};

type Surah = {
    nomor: number;
    nama: string;
    nama_latin: string;
    jumlah_ayat: number;
    tempat_turun: string;
    arti: string;
    deskripsi: string;
    audio: string;
    ayat: Ayat[];
};

export default function SurahDetail() {
    const params = useSearchParams();
    const id = params.get('id');
    const { theme } = useTheme();
    const colors = Colors[theme];
    const { currentAudioUrl, isPlaying, playAudio, togglePlayPause } = useAudioPlayerContext();
    const [surah, setSurahs] = useState<Surah | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const loadSurahDetail = async () => {
            try {
                const json = await getSurahDetail(Number(id));
                setSurahs(json);
                navigation.setOptions({
                    title: json.nama_latin,
                });
                setLoading(false);
            } catch {
                setError('Gagal memuat data');
                setLoading(false);
            }
        };

        loadSurahDetail();
    }, [id, navigation]);

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
        <SafeAreaView edges={['bottom']} className='flex-1'>
            <FlatList
                data={surah?.ayat}
                ListHeaderComponent={() => (
                    <View className='mb-8'>
                        <View className='h-40 relative p-0 rounded-xl overflow-hidden mx-4'>
                            <ImageBackground source={imgBgSurah} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
                                <View className='flex flex-row justify-between px-4 py-6'>
                                    <View className='flex-1'>
                                        <ThemedText
                                            fontFamily='poppins'
                                            fontWeight='bold'
                                            darkColor='#fff'
                                            lightColor='#fff'
                                            className='text-white text-2xl mb-2'
                                        >
                                            {surah?.nama_latin}
                                        </ThemedText>

                                        <ThemedText fontFamily='poppins' darkColor='#fff' lightColor='#fff' className='text-white text-lg'>
                                            {surah?.arti}
                                        </ThemedText>

                                        <ThemedText
                                            fontFamily='poppins'
                                            darkColor='#fff'
                                            lightColor='#fff'
                                            className='text-white text-sm mt-4 capitalize flex flex-row items-center gap-2'
                                        >
                                            {surah?.tempat_turun} • {surah?.jumlah_ayat} Ayat
                                        </ThemedText>
                                    </View>

                                    <View className='flex flex-col justify-between items-end text-right gap-2 h-full'>
                                        <ThemedText
                                            fontFamily='scheherazade'
                                            darkColor='#fff'
                                            lightColor='#fff'
                                            className='text-white text-4xl font-semibold'
                                        >
                                            {surah?.nama}
                                        </ThemedText>

                                        {surah?.audio && (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const isCurrentAudio = currentAudioUrl === surah.audio;
                                                    if (isCurrentAudio) {
                                                        togglePlayPause();
                                                    } else {
                                                        playAudio(surah.audio, surah.nama_latin, surah.arti);
                                                    }
                                                }} 
                                                className='mt-auto'
                                            >
                                                <Ionicons
                                                    name={currentAudioUrl === surah.audio && isPlaying ? 'pause' : 'play'}
                                                    size={40}
                                                    color='#fff'
                                                /> 
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>

                        {surah?.nomor !== 1 && (
                            <ThemedText
                                fontFamily='scheherazade'
                                className='text-center text-2xl leading-loose font-semibold text-black dark:text-white mt-6'
                            >
                                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                            </ThemedText>
                        )}
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ backgroundColor: getBackgroundColor(theme), paddingVertical: 16 }}
                renderItem={({ item, index }) => (
                    <View className='px-4 py-2 mb-3 text-right text-xl'>
                        <View className='flex flex-row justify-between overflow-hidden gap-4'>
                            <ThemedText
                                lightColor='#fff'
                                darkColor='#fff'
                                fontFamily='poppins'
                                className='font-bold h-8 min-w-8 px-1 flex items-center justify-center py-1 text-center bg-teal-800 dark:bg-teal-800 rounded-md'
                            >
                                {index + 1}
                            </ThemedText>

                            <View className='flex-1'>
                                <ThemedText
                                    fontFamily='scheherazade'
                                    className='text-2xl leading-loose font-semibold text-black dark:text-white text-right'
                                >
                                    {item.ar}
                                </ThemedText>
                            </View>
                        </View>

                        <ThemedText fontFamily='poppins' className='pl-8 text-gray-700 dark:text-gray-400 mt-6 mb-2'>
                            {item.idn}
                        </ThemedText>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
