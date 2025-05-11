import { Container } from "@/components/container/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/tickets/Tickets";
import { dashboard } from "@/language/portugues.json";

import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
  });

  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chamados</h1>
        <Link
          href="/dashboard/new"
          className="bg-blue-500 px-4 py-1 rounded text-white"
        >
          {dashboard.createTicket}
        </Link>
      </div>
      <table className="min-w-full my-2">
        <thead>
          <tr>
            <th className="font-medium text-left pl-1">{dashboard.client}</th>
            <th className="font-medium text-left hidden sm:block">
              {dashboard.date_registration}
            </th>
            <th className="font-medium text-left">{dashboard.status}</th>
            <th className="font-medium text-left">{dashboard.actions}</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              customer={ticket.customer}
            />
          ))}
        </tbody>

        {tickets.length === 0 && (
          <h1 className="px-2 md:px-0 text-gray-600">
            Nenhum ticket ABERTO foi encontrado
          </h1>
        )}
      </table>
    </Container>
  );
}
