"use client"

import {createContext, ReactNode, useState} from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { CustomerInterface } from '@/utils/customer.type'
import { ModalTicket } from '@/components/modal/modalComponent';

interface ModalContextData{
    visible: boolean;
    handleModalVisible: () => void;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({children}:{children:ReactNode})=>{
    const [visible, setVisible] = useState<boolean>(true)

    function handleModalVisible(){
        setVisible(visible => !visible)
    }
    return (
        <ModalContext.Provider
            value={{
                visible,
                handleModalVisible
            }}
        >
            {visible && <ModalTicket/>}
            {children}
        </ModalContext.Provider>
    )
}