import { TicketProps } from "@/utils/ticket.type";
import { CustomerInterface } from "@/utils/customer.type";
import { FiFile, FiTrash2 } from "react-icons/fi";

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerInterface | null;
}

export function TicketItem({ticket, customer}:TicketItemProps){
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
                    <button>
                        <FiTrash2 size={24} color="#EF4444"/>
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6"/>
                    </button>
                </td>
            </tr>
        </>
    )
}