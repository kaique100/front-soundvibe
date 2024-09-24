"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ShieldX } from "lucide-react"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <main className="flex flex-col items-center justify-center h-screen p-24">
            <Alert>
                <ShieldX className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription className="flex flex-col gap-4 items-center">
                    {error.message}
                    <Button onClick={() => reset()}>Tentar novamente</Button>
                </AlertDescription>
            </Alert>

        </main>
    )
}