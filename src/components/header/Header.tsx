import Link from 'next/link'
import {FiUser, FiLogOut} from 'react-icons/fi'
import text from '@/language/portugues.json'

export function Header(){
    return(
        <header className='w-full flex items-center justify-center px-2 py-4 bg-white h-20'>
            <div className='w-full flex items-center justify-between max-w-7xl'>
                <Link href="/">
                    <h1 className='font-bold text-2xl pl-1 hover:tracking-widest duration-300'>
                        <span className='text-blue-500'>{text.header.title1}</span> {text.header.title2}
                    </h1>
                </Link>

                <div className='flex items-center'>
                    <Link href="/dashboard">
                        <FiUser size={26} color='#4b5563'></FiUser>
                    </Link>
                    
                    <button className='ml-3'>
                        <FiLogOut size={26} color='#4b5563'/>
                    </button>
                </div>
            </div>
        </header>
    )
}