import {NextRequest, NextResponse} from 'next/server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Params } from 'next/dist/server/request/params';

type Context = {
    params: {
      id: string
    }
}

export async function POST(request: Request){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({error: "Not authorized"}, {status: 401})
    }


    const { name, email, phone, address, userId } = await request.json();

    try {
        await prisma.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : "",
                userId,
            }   
        })
        
        return NextResponse.json({message: "Cliente cadastrado com sucesso!"})
    } catch (err) {
        return NextResponse.json({error: "Failed create new customer"}, {status: 400})
    }
}

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
        return NextResponse.json({error: "Not authorized"}, {status: 401})
    }

    try {
        const customers = await prisma.customer.findMany({
            where: {
                userId
            }
        })

        console.log(customers)
        return NextResponse.json({message: customers}, {status: 200})
    } catch (error) {
        console.error('Erro no GET /api/customer:', error)
        return NextResponse.json({message: "failed find customer"}, {status: 400})
    }
}

export async function DELETE(req: NextRequest){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({error: "Not authorized"}, {status: 401})
    }

    const { searchParams } = new URL(req.url)
    const CustomerId = searchParams.get('id')

    if (!CustomerId){
        return NextResponse.json({error: "Not authorized"}, {status: 401})
    }

    const findTicket = await prisma.ticket.findFirst({
        where: {
            customerId: CustomerId
        }
    })

    if(findTicket){
        return NextResponse.json({error: "Failed delete customer"}, {status: 400})
    }

    try {
        await prisma.customer.delete({
            where: {
                id: CustomerId
            }
        })

        return NextResponse.json({message: "Card deletado com sucesso"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "failed delete card"}, {status: 400})
    }
}