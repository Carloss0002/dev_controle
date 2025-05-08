import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'


export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        return NextResponse.json({error: "Not autorized"}, {status: 401})
    }
    
    const {id} = await request.json()

    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if (!findTicket){
        return NextResponse.json({message: "Filed update ticket"}, {status: 400})
    }

    try {
        await prisma.ticket.update({
            where: {
                id: id as string
            },
            data:{
                status: "FECHADO"
            }
        })

        return NextResponse.json({message: "Chamado atualizado com sucesso"})
    } catch (error) {
        NextResponse.json({error: "filed update ticket"}, {status: 400})
    }

}