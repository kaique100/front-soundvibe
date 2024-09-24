"use server"

export async function fetchMusics(){
    const response = await fetch("http://localhost:8082/musics", {
        cache: 'no-store'
    })
    const cars = await response.json()
    return cars
}

export async function fetchMusicById(id: string){
    const response = await fetch(`http://localhost:8082/musics/${id}`, {
        cache: 'no-store'
    })
    const car = await response.json()
    return car
}