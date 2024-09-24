"use client"

import { login, logout } from "@/app/actions/user-actions"
import { AuthContext } from "@/app/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useFormState } from "react-dom"

const initialState = {
    message: '',
    username: '',
    success: false
}

export function DialogLogin() {
    const { user, setUser } = useContext(AuthContext)

    const [state, formAction] = useFormState(login, initialState)
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
        setUser(null)
    }

    useEffect(() => {
        if (state.success) {
            setOpen(false)
            setUser({ name: state.username, id: state.userid, role: state.userrole })
        }
    }, [state.success])

    if (user) {
        return (
            <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4 mr-2" />
                <span>{user.name}</span>
                <Button variant="outline" onClick={handleLogout}>Sair</Button>
            </div>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <UserCircle className="w-4 h-4 mr-2" />
                    Entrar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Fazer Login</DialogTitle>
                    <DialogDescription>
                        Fazendo login você pode comentar e avaliar os carros
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Usuário
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Senha
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            className="col-span-3"
                            type="password"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Entrar</Button>
                    </DialogFooter>
                </form>
                {state?.message && <p className="text-red-500">{state?.message}</p>}
            </DialogContent>
        </Dialog>
    )
}
