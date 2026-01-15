const BASE_URL = "https://equran.id/api";

export async function getSurahList() {
  const res = await fetch(`${BASE_URL}/surat`);
  const json = await res.json();
  return json;
}

export async function getSurahDetail(id: number) {
  const res = await fetch(`${BASE_URL}/surah/${id}`);
  const json = await res.json();
  return json.data;
}
