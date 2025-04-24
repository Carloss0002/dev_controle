import { Container } from "@/components/container/Container";
import {dashboard} from '@/language/portugues.json'
import Link from "next/link";

export function DashboardHeader(){
    return (
        <Container>
            <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 text-white items-center">
                <Link href="/dashboard" className="hover:font-bold duration-300">
                    {dashboard.header.callings}
                </Link>
                
                <Link href="/dashboard/customer" className="hover:font-bold duration-300">
                    {dashboard.header.clients}
                </Link>
            </header>
            
        </Container>
    )
}