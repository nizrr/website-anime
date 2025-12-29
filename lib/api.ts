import { Anime, JikanResponse, NewestEpisode } from "@/types/anime";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jikan.moe/v4";

async function fetchJikan<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
}

export async function getTopAnime(): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<JikanResponse<Anime[]>>(`/top/anime`);
}

// export async function getNewestAnime(): Promise<JikanResponse<Anime[]>> {
//    return fetchJikan<JikanResponse<Anime[]>>(`/seasons/now`)
// }

export async function getNewestEpisodes(): Promise<
  JikanResponse<NewestEpisode[]>
> {
  const response = await fetchJikan<JikanResponse<NewestEpisode[]>>(
    `/watch/episodes`
  );
  return {
    ...response,
    data: response.data.filter((item) => !item.region_locked),
  };
}
