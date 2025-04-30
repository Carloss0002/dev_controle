import { Container } from "@/components/container/Container";
import Link from "next/link";

export default function NewTicket(){
    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900">Voltar</Link>
                    <h1 className="text-3xl font-bold">Novo chamados</h1>
                </div>
                <form className="flex flex-col mt-6 ">
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input
                        className="w-full border rounded-md px-2 mb-2 h-11"
                        type="text"
                        placeholder="Digite o nome do chamado"
                        required
                    />
                    <label className="mb-1 font-medium text-lg mt-4">Descreva o problema</label>
                    <textarea
                        className="w-full border resize-none rounded-md px-2 mb-2 h-24"
                        placeholder="Descreva o problema..."
                        required
                    ></textarea>
                    <label className="mb-1 font-medium text-lg mt-4">Selecione o problema</label>
                    <select
                        className="w-full bg-white border rounded-md px-2 mb-2 h-11"

                    >
                        <option value="cliente1">Cliente1</option>
                    </select>
                </form>
            </main>
        </Container>
    )
}