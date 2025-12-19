import { getTopAnime, getNewestEpisodes } from '@/lib/api'
import { Anime } from '@/types/anime'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Play, PlayIcon } from 'lucide-react'

export default async function Home() {
   const { data } = await getTopAnime()
   const { data: newestEpisodes } = await getNewestEpisodes()

   return (
      <div className="container mx-auto py-10 px-3 md:px-6 lg:px-8">
         <div className="mb-10">
            <Carousel
               opts={{
                  align: 'start',
               }}
               className="w-full">
               <CarouselContent>
                  {data.slice(0, 5).map((anime: Anime) => (
                     <CarouselItem
                        key={anime.mal_id}
                        className="md:basis-1/1 lg:basis-1/1 xl:basis-1/1 w-[500px] h-[400px] rounded-2xl ">
                        <div className="relative">
                           <div className="overflow-hidden hover:shadow-lg transition-shadow p-0 rounded-2xl">
                              <div className="relative w-full h-[400px] rounded-2xl ">
                                 <Image
                                    src={'/image/onepiece.jpeg'}
                                    alt={anime.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                 />
                                 <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-950/70 to-transparent w-1/2"></div>
                              </div>
                              <div className="absolute bottom-5 left-10 text-white z-10 lg:w-[500px] space-y-3">
                                 <Image
                                    src={'/image/logo-onepiece.png'}
                                    alt="Logo"
                                    width={200}
                                    height={100}
                                 />
                                 <div className="flex gap-3 h-5">
                                    <span>1999</span>
                                    <Separator orientation="vertical" className="w-2 text-white" />
                                    <span>1200 Episodes</span>
                                    <Separator orientation="vertical" />
                                    <span>9.9</span>
                                    <Separator orientation="vertical" />
                                    <span>On Going</span>
                                 </div>
                                 <p className="line-clamp-3 text-white/70">{anime.synopsis}</p>
                                 <Button className="py-2 " variant={'default'} size={'lg'}>
                                    <PlayIcon className="mr-2 h-4 w-4" />
                                    Watch Now
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </CarouselItem>
                  ))}
               </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
            </Carousel>
         </div>
         <h1 className="text-3xl font-bold mb-8">Newest Episodes</h1>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newestEpisodes.map(item => (
               <Card
                  key={`${item.entry.mal_id}-${item.episodes[0]?.mal_id}`}
                  className="overflow-hidden hover:shadow-lg transition-shadow p-0">
                  <div className="relative aspect-2/3 w-full">
                     <Image
                        src={item.entry.images.webp.large_image_url}
                        alt={item.entry.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                     <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
                        Ep{' '}
                        {item.episodes[0]?.title.split(' ')[1] || item.episodes[0]?.mal_id || '?'}
                     </div>
                  </div>
                  <CardHeader className="p-2">
                     <CardTitle className="line-clamp-2 text-base" title={item.entry.title}>
                        {item.entry.title}
                     </CardTitle>
                  </CardHeader>
               </Card>
            ))}
         </div>
      </div>
   )
}
