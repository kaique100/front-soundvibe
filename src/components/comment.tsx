"use client"

import { Button } from "@/components/ui/button"
import { deleteComment } from "@/app/actions/comments-actions"
import { Trash2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { AuthContext } from "@/app/contexts/AuthContext"
import { useContext } from "react"

export default function Comment({ comment }: { comment: Comment }) {
    const router = useRouter()
    const { user } = useContext(AuthContext)

    const handleDeleteComment = async () => {
        await deleteComment(comment.id)
        router.refresh()
    }

    return (
        <li className="flex flex-col gap-2 bg-secondary p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.name}</span>
                <span className="text-sm font-extralight text-muted-foreground">{comment.createdDate}</span>
            </div>
            <p className="text-sm">{comment.comment}</p>
            {user && user.role === 'ROLE_ADMIN' && (
                <Button variant="destructive" title="Deletar comentário" className="self-end" onClick={handleDeleteComment}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}

        </li>
    )
}