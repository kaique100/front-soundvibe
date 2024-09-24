interface Music {
    id: number
    author: string
    title: string
    description: string
    imageUrl: string
    comments: Comment[]
}

interface Comment {
    id: number
    name: string
    comment: string
    createdDate: string
}

interface User {
    id: number
    name: string
    role: string
}