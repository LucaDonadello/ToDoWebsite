import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "./components/TodoItem";
import Stack from "react-bootstrap/Stack";
import { redirect } from "next/navigation";

function getTodos() {
  return prisma.toDo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.toDo.update({ where: { id }, data: { complete } });
}

async function deleteTodo() {
  "use server";
  await prisma.toDo.deleteMany({ where: { complete: true } });
  redirect("/");
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Todos:</h1>
        <Stack gap={2}>
          <div className="flex gap-1">
            <Link
              className="border border-slate-300
        text-slate-300 px-2 py-1 rounded hover:bg-slate-700
        focus-within:bg-slate-700 outline-none"
              href="/new"
            >
              New
            </Link>
          </div>
          <div className="flex gap-1 pt-1">
            <form action={deleteTodo}>
              <button
                className="border border-slate-300
        text-slate-300 px-2 py-1 rounded hover:bg-slate-700
        focus-within:bg-slate-700 outline-none"
                type="submit"
              >
                Delete
              </button>
            </form>
          </div>
        </Stack>
      </header>
      <ul className="pl-2">
        {todos.map((toDo) => (
          <TodoItem key={toDo.id} {...toDo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
