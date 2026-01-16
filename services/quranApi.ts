const BASE_URL = 'https://equran.id/api';

export async function getSurahList() {
    const res = await fetch(`${BASE_URL}/surat`);
    const json = await res.json();
    return json;
}

export async function getSurahDetail(id: number) {
    const res = await fetch(`${BASE_URL}/surat/${id}`);
    const json = await res.json();
    return json;
}

export async function getJuzList() {
    // Generate list of 30 juz
    const juzList = Array.from({ length: 30 }, (_, i) => ({
        nomor: i + 1,
        nama: `Juz ${i + 1}`,
    }));
    return juzList;
}

export async function getJuzDetail(id: number) {
    const res = await fetch(`${BASE_URL}/juz/${id}`);
    const json = await res.json();
    return json.data;
}
