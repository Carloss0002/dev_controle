import {Container} from '@/components/container/Container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { CardCustomer } from './components/card/Card'
import { dashboard } from '@/language/portugues.json'
import {CustomerInterface} from '@/utils/customer.type'
import api from '@/lib/api'
import Link from 'next/link'


async function fetchCustomerData(userId: string): Promise<CustomerInterface[]> {
    try {
      const response = await api.get(`/api/customer?userId=${userId}`)
      return response.data.message || []
    } catch (error) {
      console.error('Erro ao buscar os clientes:', error)
      return [] 
    }
}

export default async function Customer(){
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
        redirect("/")
    }
    
    const customerData:CustomerInterface[] = await fetchCustomerData(session.user.id)

    return (
        <Container>
            <main className='mt-9 mb-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold'>{dashboard.my_clients}</h1>
                    <Link href='/dashboard/customer/new' className='bg-blue-500 text-white px-4 py-1 rounded '>
                        {dashboard.new_client}
                    </Link>
                </div>
                <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {
                        customerData.length > 0 ? (

                            customerData.map((customer:CustomerInterface) => (
                                <CardCustomer 
                                    key={customer.id} 
                                    customer={customer}
                                />
                            ))
                        ) : (
                            <p>Nenhum cliente disponivel</p>
                        )
                    }
                </section>
            </main>
        </Container>
    )
}