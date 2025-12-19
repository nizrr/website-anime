export interface AnimeImage {
   webp: {
      image_url: string
      large_image_url: string
   }
}
export interface Anime {
   mal_id: number
   title: string
   images: AnimeImage
   score: number
   synopsis: string
   year: number
   genres: { name: string }[]
   episodes?: number
   status?: string
   broadcast?: {
      day: string
      time: string
      timezone: string
      string: string
   }
}

export interface Episode {
   mal_id: number
   title: string
   url: string
   premium: boolean
}

export interface NewestEpisode {
   entry: Anime
   episodes: Episode[]
   region_locked: boolean
}

export interface JikanResponse<T> {
   data: T
   pagination: {
      last_visible_page: number
      has_next_page: boolean
   }
}
