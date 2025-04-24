import { Container } from "@/components/container/Container" 
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {redirect} from 'next/navigation'
import { TicketItem } from "./components/tickets/Tickets"
import {dashboard} from '@/language/portugues.json'

import Link from "next/link"

export default async function Dashboard(){
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }
    
    return (
        <Container>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Chamados</h1>
                <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                    {dashboard.createTicket}
                </Link>
            </div>
            <table className="min-w-full my-2">
                <thead>
                    <tr>
                        <th className="font-medium text-left pl-1">{dashboard.client}</th>
                        <th className="font-medium text-left hidden sm:block">{dashboard.date_registration}</th>
                        <th className="font-medium text-left">{dashboard.status}</th>
                        <th className="font-medium text-left">{dashboard.actions}</th>
                    </tr>
                </thead>
                <tbody>
                    <TicketItem/>
                    <TicketItem/>
                </tbody>
            </table>
        </Container>
    )
}