"use client"

import { useContext, useEffect } from "react"
import { AuthContext } from "@/app/contexts/AuthContext"
import { Button } from "./ui/button"
import { useFormState } from "react-dom"
import { createComment } from "@/app/actions/comments-actions"

const initialState = {
    comment: '',
    success: false,
    message: ''
}

export function CommentForm({ musicId }: { musicId: string }) {
    const { user } = useContext(AuthContext)

    const [state, formAction] = useFormState(createComment, initialState)

    if (!user) {
        return (
            <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Você precisa estar logado para comentar</p>
            </div>
        )
    }

    return (
        <form action={formAction} className="mt-4 space-y-4 min-w-[500px]">
            <input type="hidden" name="musicId" value={musicId} />
            <input type="hidden" name="userId" value={user.id} />
            <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                    Deixe seu comentário
                </label>
                <textarea
                    required
                    id="comment"
                    name="comment"
                    rows={4}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Digite seu comentário aqui..."
                ></textarea>
            </div>
            <Button type="submit">Enviar Comentário</Button>
            {state?.message && <p className="text-red-500">{state?.message}</p>}
        </form>
    )
}

