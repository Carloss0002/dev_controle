"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '@/components/input/FormInput'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email valido").min(1, "O email é obrigatório"),
    phone: z.string().refine((value) => {
        const regexWithParenthesis = /^(?:\(\d{2}\)\s?)?\d{9}$/ 
        const regexWithoutParenthesis = /^\d{2}\s\d{9}/
        const regexWithoutFormatting = /^\d{11}$/
        const testRegex = regexWithParenthesis.test(value) || regexWithoutFormatting.test(value) || regexWithoutParenthesis.test(value)

        return testRegex
    }, {
        message: "O número de telefone deve estar DDD (DD) 999999999"
    }),
    address: z.string()
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId}: {userId: string}){
    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router  = useRouter()

    async function handleRegisterCustomer(data: FormData){
        const response = await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            userId,
            address: data.address
        });
        router.refresh()
        router.replace('/dashboard/customer')
        console.log(response.data);
    }
    return (
        <form className='flex flex-col mt-6' onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className='mb-1 text-lg font-medium'>Nome Completo</label>
            <Input
                type='text'
                placeholder='Digite o nome completo'
                {...register("name")}
                error={errors.name?.message}
            />
            <div className="flex gap-2 mt-6 flex-col sm:flex-row">
                <div className='flex-1 flex-col'>
                    <label htmlFor='phone' className="mb-1 text-lg font-medium">Telefone</label>
                    <Input
                        type='number'
                        placeholder='(DD) 000000000'
                        {...register("phone")}
                        error={errors.phone?.message}
                        id='phone'
                    />
                </div>
                <div className='flex-1'>
                    <label htmlFor='email' className="mb-1 text-lg font-medium">Email</label>
                    <Input
                        type='email'
                        placeholder='Digite seu email'
                        {...register("email")}
                        error={errors.email?.message}
                        id='email'
                    />
                </div>
            </div>
            <div className='flex-1 mt-6'>
                <label htmlFor='address' className="mb-1 text-lg font-medium">Endereço completo</label>
                <Input
                    type='text'
                    placeholder='Digite o endereço do cliente'
                    {...register("address")}
                    error={errors.address?.message}
                    id='address'
                />
            </div>
            <button type='submit' className='bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold'>
                Cadastrar
            </button>
        </form>
    )
}