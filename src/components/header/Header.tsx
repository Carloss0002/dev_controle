"use client"

import Link from 'next/link'
import {FiUser, FiLogOut, FiLoader, FiLock} from 'react-icons/fi'
import {signIn, signOut, useSession} from 'next-auth/react'
import text from '@/language/portugues.json'

export function Header(){
    const { status, data } = useSession();

    async function handleLogin(){
        await signIn();
    }

    async function handleLogout() {
        await signOut();
    }
    return(
        <header className='w-full flex items-center justify-center px-2 py-4 bg-white h-20'>
            <div className='w-full flex items-center justify-between max-w-7xl'>
                <Link href="/">
                    <h1 className='font-bold text-2xl pl-1 hover:tracking-widest duration-300'>
                        <span className='text-blue-500'>{text.header.title1}</span> {text.header.title2}
                    </h1>
                </Link>

                {status == "loading" && (
                    <button>
                        <FiLoader className='animate-spin duration-100' size={26} color='#4b5563'/>
                    </button>
                )}
                {status == "unauthenticated" && (
                    <button onClick={handleLogin}>
                        <FiLock size={26} color='#4b5563'/>
                    </button>
                )}
                
                {status == "authenticated" && (     
                    <div className='flex items-center'>
                        <Link href="/dashboard">
                            <FiUser size={26} color='#4b5563'></FiUser>
                        </Link>
                        
                        <button className='ml-3' onClick={handleLogout}>
                            <FiLogOut size={26} color='#f57b7b'/>
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}