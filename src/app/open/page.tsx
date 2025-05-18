"use client";
import { Input } from "@/components/input/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar")
    .min(1, "O campo email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

      <div className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-6 px-2 rounded flex items-center justify-between">
            <p>
              <strong>Cliente selecionado: </strong>
              {customer.name}
            </p>
            <button
              className="h-11 border text-[#FF2929] border-[#FF2929] hover:text-amber-50 hover:cursor-pointer hover:bg-[#FF2929]  flex px-2 items-center justify-center rounded"
              onClick={handleClearCustomer}
            >
              <FiX size={24} />
            </button>
          </div>
        ) : (
          <>
            <form className="bg-slate-200 py-6 px-2 rounded">
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="Digite o email do cliente..."
                  type="text"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <button className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center rounded text-white">
                  Procurar cliente
                  <FiSearch size={24} color="#FFFF" />
                </button>
              </div>
            </form>
            <FormTicket/>
          </>
        )}
      </div>
    </div>
  );
}
