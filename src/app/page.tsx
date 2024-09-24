import { DialogLogin } from "@/components/ui/dialog-login";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { fetchMusics } from "./actions/music-actions";
import Link from "next/link";


export default async function Home() {

  const cars = await fetchMusics()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">

      <nav className="absolute top-2 right-2">
        <DialogLogin />
      </nav>

      <h1 className="text-4xl font-bold">SoundVibe</h1>

      <p className="text-lg">
      " Deixe sua vibe sobre a musica"
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((music: Music) => (
          <Card className="flex flex-col">
            <CardHeader>
              <img className="w-full h-[200px] object-cover" src={music.imageUrl} alt={music.author} />
              <CardTitle>{music.author}</CardTitle>
              <CardDescription>{music.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{music.description}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/details/${music.id}`} className="w-full">
                <Button className="w-full">Ver mais</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>


    </main>
  );
}
