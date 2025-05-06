import { Container } from "@/components/container/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData){
    "use server"
    const name = formData.get("name")
    const description = formData.get("description")
    const customer = formData.get("customer")
    
    if (!name || !description || !customer) return;

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customer as string,
        status: "ABERTO",
        userId: session?.user.id
      }
    })

    redirect("/dashboard")
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamados</h1>
        </div>
        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            className="w-full border rounded-md px-2 mb-2 h-11"
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
          />
          <label className="mb-1 font-medium text-lg mt-4">
            Descreva o problema
          </label>
          <textarea
            className="w-full border resize-none rounded-md px-2 mb-2 h-24"
            placeholder="Descreva o problema..."
            required
            name="description"
          ></textarea>
          {customers.length !== 0 ? (
            <>
              <label className="mb-1 font-medium text-lg mt-4">
                Selecione o problema
              </label>
              <select className="w-full bg-white border rounded-md px-2 mb-2 h-11"name="customer" >
                {customers.map((customer) => (
                  <option value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </>
          ) : (
            <Link href="/dashboard/customer/new">
              Você ainda não possui nenhum cliente,{" "}
              <span>Cadastrar cliente</span>
            </Link>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold cursor-pointer px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length == 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
