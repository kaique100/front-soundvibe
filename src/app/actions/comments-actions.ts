"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function createComment(prevState: any, formData: FormData) {
    const comment = formData.get('comment')
    const musicId = formData.get('musicId')
    const userId = formData.get('userId')

    const response = await fetch(`http://localhost:8082/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        },
        body: JSON.stringify({ comment, musicId, userId })
    })

    
    if (!response.ok) {
        return {
            success: false,
            message: 'Erro ao criar comentário.' + response.status,
            comment: null
        }
    }
    
    const data = await response.json()

    redirect(`/details/${musicId}`)
    
    return { 
        success: true,
        message: '',
        comment: data
    }
}

export async function deleteComment(id: number) {
    const response = await fetch(`http://localhost:8082/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        }
    })

    
    if (!response.ok) {
        const data = await response.json()
        return {
            success: false,
            message: data.message,
        }
    }

    return {
        success: true,
        message: '',
    }
}