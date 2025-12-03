
import { getTopAnime, getRecentEpisodes } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"

export default async function Home() {
   const { data } = await getTopAnime()
   const { data: recentEpisodes } = await getRecentEpisodes()

   return (
      <div className="container mx-auto py-10 px-3 md:px-6 lg:px-8">
         <div className="mb-10">
            <Carousel
               opts={{
                  align: "start",
               }}
               className="w-full"
            >
               <CarouselContent>
                  {data.slice(0, 5).map((anime) => (
                     <CarouselItem key={anime.mal_id} className="md:basis-1/1 lg:basis-1/1 xl:basis-1/1 w-[500px] h-[400px] rounded-2xl ">
                        <div className="relative">
                           <div className="overflow-hidden hover:shadow-lg transition-shadow p-0 rounded-2xl">
                              <div className="relative w-full h-[400px] rounded-2xl ">
                                 <Image
                                    src={"/image/onepiece.jpeg"}
                                    alt={anime.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                 />
                                 <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-950/70 to-transparent w-1/2"></div>
                              </div>
                           <div className="absolute bottom-5 left-10 text-white z-10">
                              <Image src={"/image/logo-onepiece.png"} alt="Logo" width={200} height={100} />
                              <div className="flex gap-3 h-5">
                                 <span>1999</span>
                                 <Separator orientation="vertical" className="w-2 text-white" />
                                 <span>1200 Episodes</span>
                                 <Separator orientation="vertical" />
                                 <span>9.9</span>
                                 <Separator orientation="vertical" />
                                 <span>On Going</span>
                              </div>
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
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentEpisodes.map((item) => (
               <Card key={`${item.entry.mal_id}-${item.episodes[0]?.mal_id}`} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
                  <div className="relative aspect-2/3 w-full">
                     <Image
                        src={item.entry.images.webp.large_image_url}
                        alt={item.entry.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                     <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
                        Ep {item.episodes[0]?.title.split(' ')[1] || item.episodes[0]?.mal_id || '?'}
                     </div>
                  </div>
                  <CardHeader className="p-2">
                     <CardTitle className="line-clamp-2 text-base" title={item.entry.title}>
                        {item.entry.title}
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                     <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="line-clamp-1">{item.episodes[0]?.title}</span>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   )
}
