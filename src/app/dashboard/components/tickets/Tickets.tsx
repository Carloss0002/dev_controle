"use client"

import { TicketProps } from "@/utils/ticket.type";
import { CustomerInterface } from "@/utils/customer.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import api from "@/lib/api";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerInterface | null;
}

export function TicketItem({ticket, customer}:TicketItemProps){
    const router = useRouter()
    const { handleModalVisible, setDetailTicketInfo } = useContext(ModalContext)

    async function handleChangeStatus(){
        try {
            const response = await api.patch("/api/ticket", {
                id: ticket.id
            })

            router.refresh()
        } catch (error) {
            console.error(error)
        }
    }

    function handleOpenModal(){
        handleModalVisible()
        setDetailTicketInfo({
            customer,
            ticket
        })
    }
    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-gray-200">
                <td className="text-left pl-1">{customer?.name}</td>
                <td className="text-left hidden sm:table-cell">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">
                        {ticket.status}
                    </span>
                </td>
                <td className="text-left">
                    <button className="mr-3" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#5dc91e"/>
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color="#3b82f6"/>
                    </button>
                </td>
            </tr>
        </>
    )
}