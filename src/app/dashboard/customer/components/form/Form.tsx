"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '@/components/input/FormInput'

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
    addres: z.string()
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm(){
    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleRegisterCustomer(data: FormData){
        console.log(data)
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
            <div className="flex gap-2 mt-2 flex-col sm:flex-row">
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
            <button type='submit' className='bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold'>
                Cadastrar
            </button>
        </form>
    )
}