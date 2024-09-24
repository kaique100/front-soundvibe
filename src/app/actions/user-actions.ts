"use server"

import { cookies } from "next/headers";


export async function login(prevState: any, formData: FormData) {

    const credentials = {
        username: formData.get('username'),
        password: formData.get('password'),
    }
    const response = await fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        cache: 'no-store'
    });

    if (!response.ok) {
        return {
            message: 'Falha no login. ' + response.status,
            success: false,
            username: formData.get('username')
        }
    }

    const data = await response.json()
    const token = data.token
    const name = data.name

    cookies().set('token', token)
    cookies().set('name', name)

    return { 
        message: '', 
        success: true, 
        username: formData.get('username'),
        userid: data.id,
        userrole: data.role
    }

}

export async function logout() {
    cookies().delete('token')
    cookies().delete('name')
}
