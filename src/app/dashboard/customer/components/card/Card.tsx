import { dashboard } from '@/language/portugues.json'
import {CustomerInterface} from '@/utils/customer.type'

export function CardCustomer({customer}:{customer: CustomerInterface}) {
  return (
    <article className="flex flex-col bg-gray-100 border-gray-200 border-2 p-2 rounded-b-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">{dashboard.customer.card.name} </span>{customer.name}
      </h2>
      <p><span className="font-bold">{dashboard.customer.card.email} </span> {customer.email}</p>
      <p><span className="font-bold">{dashboard.customer.card.phone} </span>{customer.phone}</p>
      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">{dashboard.customer.card.delete}</button>
    </article>
  );
}
