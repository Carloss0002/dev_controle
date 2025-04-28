"use client"

import { dashboard } from "@/language/portugues.json";
import api from "@/lib/api";
import { CustomerInterface } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerInterface }) {
  const router = useRouter()
  function handleDeleteCustomer(){
    try{
      const response = api.delete(`/api/customer?id=${customer.id}`)
      router.refresh()
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-gray-200 border-2 p-2 rounded-b-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">{dashboard.customer.card.name} </span>
        {customer.name}
      </h2>
      <p>
        <span className="font-bold">{dashboard.customer.card.email} </span>{" "}
        {customer.email}
      </p>
      <p>
        <span className="font-bold">{dashboard.customer.card.phone} </span>
        {customer.phone}
      </p>
      <button
        onClick={handleDeleteCustomer} 
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
      >
        {dashboard.customer.card.delete}
      </button>
    </article>
  );
}
