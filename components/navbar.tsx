import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-3 md:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between container mx-auto ">
                <Link href="/" className="flex items-center space-x-2">
                <Image src="/image/logo.png" alt="Logo" width={40} height={40} />
                    <span className="font-bold text-xl">AnimeList</span>
                </Link>
                <ModeToggle />
            </div>
        </header>
    )
}
