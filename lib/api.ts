import { Anime, JikanResponse } from '@/types/anime'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function fetchJikan<T>(endpoint: string): Promise<T> {
   const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 },
   })
   if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
   }
   return response.json()
}

export async function getTopAnime(): Promise<JikanResponse<Anime>> {
   return fetchJikan<JikanResponse<Anime>>(`/top/anime`)
}
