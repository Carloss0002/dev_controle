"use client"

import {createContext, ReactNode, useState} from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { CustomerInterface } from '@/utils/customer.type'
import { ModalTicket } from '@/components/modal/modalComponent';

interface ModalContextData{
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfo | undefined;
}

interface TicketInfo {
    ticket: TicketProps;
    customer: CustomerInterface | null;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({children}:{children:ReactNode})=>{
    const [visible, setVisible] = useState<boolean>(false)
    const [ticket, setTicket] = useState<TicketInfo>()

    function handleModalVisible(){
        setVisible(visible => !visible)
    }
    return (
        <ModalContext.Provider
            value={{
                visible,
                handleModalVisible,
                ticket
            }}
        >
            {visible && <ModalTicket/>}
            {children}
        </ModalContext.Provider>
    )
}