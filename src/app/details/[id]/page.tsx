import { fetchMusicById } from "@/app/actions/music-actions";
import Comment from "@/components/comment";
import { CommentForm } from "@/components/comment-form";
import { Button } from "@/components/ui/button";
import { DialogLogin } from "@/components/ui/dialog-login";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Details({ params }: { params: { id: string } }) {
    const Music = await fetchMusicById(params.id);

    return (
        <main className="flex min-h-screen flex-col items-center p-24 gap-8">
            <div className="sticky top-0 left-0 bg-background z-10 w-full">
                <Link href="/" className="inline-block">
                    <Button variant="outline" className="flex items-center mt-4">
                        <ArrowLeft className="mr-2" />
                        Voltar
                    </Button>
                </Link>
            </div>

            <nav className="absolute top-2 right-2">
                <DialogLogin />
            </nav>

            <h1 className="text-4xl font-bold self-start">Music Sale</h1>

            <header className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold self-start">{Music.author}</h2>
                <span className="opacity-70">{Music.title}</span>
                <img className="w-full h-full object-cover" src={Music.imageUrl} alt={Music.author} />
            </header>

            <section className="max-w-2xl" >
                <p>{Music.description}</p>
            </section>

            <section className="flex flex-col gap-4">
                <h3>Comentários</h3>
                
                <ul className="mt-4 space-y-4">
                    {Music.comments.map((comment: Comment) => <Comment key={comment.id} comment={comment} /> )}
                </ul>

                <CommentForm musicId={params.id} />

            </section>


        </main>
    );
}