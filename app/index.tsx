import { Colors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getSurahList } from '@/services/quranApi';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

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

export default function Index() {
    const { theme } = useTheme();
    const colors = Colors[theme];
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
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size='large' color={colors.tint} />
                <Text style={{ color: colors.text, marginTop: 12 }}>Memuat surah...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>{error}</Text>
            </View>
        );
    }

    return (
        <View className='pb-16'>
            <Text className='text-2xl font-bold text-center my-4 text-black dark:text-white'>Daftar Surah</Text>
            <FlatList
                data={surahs}
                keyExtractor={(item) => item.nomor.toString()}
                contentContainerStyle={[styles.list, { backgroundColor: colors.background }]}
                renderItem={({ item }) => (
                    <Pressable className='flex flex-row items-center py-3 border-b border-gray-300 shadow rounded-md dark:border-gray-700' onPress={() => router.push(`/surah/${item.nomor}`)}>
                        <Text style={[styles.number, { color: colors.text }]}>{item.nomor}</Text>
                        <View>
                            <Text style={[styles.name, { color: colors.text }]}>{item.nama}</Text>
                            <Text style={[styles.translation, { color: colors.icon }]}>
                                {item.nama_latin} • {item.jumlah_ayat} ayat
                            </Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    number: {
        width: 32,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 18,
    },
    translation: {
        fontSize: 12,
    },
});
